import React, { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
    Box,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Stack,
} from '@mui/material';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const StripeInner = ({
    amountUSD,
    paymentIntentId,
    customerInfo,
    orderDetails,
    disabled,
    onSuccess,
    onPending,
    onError,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handlePay = async () => {
        if (!stripe || !elements) return;
        setSubmitting(true);
        setErrorMsg('');

        // Persist state for 3DS redirect recovery in /checkout/return
        try {
            sessionStorage.setItem(
                `stripe_pending_${paymentIntentId}`,
                JSON.stringify({ customerInfo, orderDetails }),
            );
        } catch (_) { /* ignore quota */ }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/return`,
                receipt_email: customerInfo?.email,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMsg(error.message || 'Payment failed');
            onError?.(error);
            setSubmitting(false);
            return;
        }

        if (!paymentIntent) {
            setSubmitting(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            sessionStorage.removeItem(`stripe_pending_${paymentIntent.id}`);
            onSuccess?.(paymentIntent.id, 'succeeded');
        } else if (paymentIntent.status === 'processing' || paymentIntent.status === 'requires_action') {
            // OXXO / SPEI: show voucher
            const next = paymentIntent.next_action;
            const voucher = next?.oxxo_display_details
                || next?.display_bank_transfer_instructions
                || null;
            const pm = next?.type;
            onPending?.(paymentIntent.id, voucher, pm);
        } else {
            setErrorMsg(`Unexpected payment status: ${paymentIntent.status}`);
        }

        setSubmitting(false);
    };

    return (
        <Stack spacing={2}>
            <PaymentElement options={{ layout: 'tabs' }} />
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={disabled || submitting || !stripe || !elements}
                onClick={handlePay}
                sx={{
                    py: 1.5,
                    fontWeight: 700,
                    background: 'linear-gradient(to right, #635bff, #4338ca)',
                    '&:hover': { background: 'linear-gradient(to right, #4338ca, #312e81)' },
                }}
            >
                {submitting ? 'Processing…' : `Pay $${amountUSD.toFixed(2)} USD`}
            </Button>
            <Typography variant="caption" color="text.secondary" textAlign="center">
                Charged in USD. Card, Apple Pay and Google Pay accepted.
            </Typography>
        </Stack>
    );
};

const StripePaymentForm = ({ amountUSD, customerInfo, orderDetails, disabled, onSuccess, onPending, onError }) => {
    const stripePromise = useMemo(() => (STRIPE_PK ? loadStripe(STRIPE_PK) : null), []);
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    // (Re)create the PaymentIntent when the form becomes valid and amount/customer changes.
    useEffect(() => {
        if (disabled) return;
        if (!amountUSD || amountUSD <= 0) return;
        if (clientSecret) return; // already created

        let cancelled = false;
        setLoading(true);
        setLoadError(null);

        fetch(`${API_URL}/api/stripe/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amountUSD, customerInfo, orderDetails }),
        })
            .then((r) => r.json())
            .then((json) => {
                if (cancelled) return;
                if (json.success) {
                    setClientSecret(json.clientSecret);
                    setPaymentIntentId(json.paymentIntentId);
                } else {
                    setLoadError(json.message || 'Could not initialize Stripe');
                    toast.error(json.message || 'Could not initialize Stripe');
                }
            })
            .catch((err) => {
                if (!cancelled) setLoadError(err.message || 'Network error initializing Stripe');
            })
            .finally(() => !cancelled && setLoading(false));

        return () => { cancelled = true; };
    }, [disabled, amountUSD, clientSecret, customerInfo, orderDetails]);

    if (!STRIPE_PK) {
        return <Alert severity="warning">Stripe is not configured (missing VITE_STRIPE_PUBLISHABLE_KEY).</Alert>;
    }

    if (loadError) {
        return <Alert severity="error">{loadError}</Alert>;
    }

    if (disabled || loading || !clientSecret) {
        return (
            <Box sx={{ minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? <CircularProgress /> : (
                    <Typography color="text.secondary">Complete the form above to enable payment</Typography>
                )}
            </Box>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#ec4899',
                        borderRadius: '8px',
                    },
                },
            }}
        >
            <StripeInner
                amountUSD={amountUSD}
                paymentIntentId={paymentIntentId}
                customerInfo={customerInfo}
                orderDetails={orderDetails}
                disabled={disabled}
                onSuccess={onSuccess}
                onPending={onPending}
                onError={onError}
            />
        </Elements>
    );
};

export default StripePaymentForm;
