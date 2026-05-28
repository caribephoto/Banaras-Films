import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    Box,
    Container,
    Paper,
    Typography,
    Stack,
    CircularProgress,
    Button,
    Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StripeVoucherDisplay from '../components/cart/StripeVoucherDisplay';
import { useCart } from '../context/CartContext';
import { useCountry } from '../context/CountryContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : null;

const CheckoutReturn = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { formatCurrency } = useCountry();

    const [status, setStatus] = useState('loading'); // loading | succeeded | processing | failed
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [voucher, setVoucher] = useState(null);
    const [voucherType, setVoucherType] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const clientSecret = params.get('payment_intent_client_secret');
        const paymentIntentId = params.get('payment_intent');
        if (!clientSecret || !stripePromise) {
            setStatus('failed');
            setErrorMsg('Missing payment information');
            return;
        }

        let cancelled = false;

        (async () => {
            const stripe = await stripePromise;
            const { paymentIntent: pi, error } = await stripe.retrievePaymentIntent(clientSecret);
            if (cancelled) return;
            if (error || !pi) {
                setStatus('failed');
                setErrorMsg(error?.message || 'Could not retrieve payment');
                return;
            }
            setPaymentIntent(pi);

            const snapshotKey = `stripe_pending_${pi.id}`;
            const snapshotRaw = sessionStorage.getItem(snapshotKey);
            const snapshot = snapshotRaw ? JSON.parse(snapshotRaw) : null;

            if (pi.status === 'succeeded') {
                // Persist order from snapshot (webhook will also try; idempotent)
                if (snapshot) {
                    try {
                        const saveResp = await fetch(`${API_URL}/api/save-order`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                stripePaymentIntentId: pi.id,
                                paymentProvider: 'stripe',
                                paymentStatus: 'completed',
                                customerInfo: snapshot.customerInfo,
                                orderDetails: snapshot.orderDetails,
                            }),
                        });
                        const saveJson = await saveResp.json();
                        // Only send email if frontend insert was new (webhook will email otherwise)
                        if (saveJson.success && saveJson.data && !saveJson.data.isDuplicate) {
                            await fetch(`${API_URL}/api/send-order-email`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    customerInfo: snapshot.customerInfo,
                                    orderDetails: { ...snapshot.orderDetails, orderId: pi.id },
                                }),
                            });
                        }
                    } catch (e) {
                        console.error('Post-pay save failed (webhook will retry):', e);
                    }
                    sessionStorage.removeItem(snapshotKey);
                    clearCart();
                }
                setStatus('succeeded');
            } else if (pi.status === 'processing' || pi.status === 'requires_action') {
                // OXXO / SPEI: show voucher; save order as pending
                const next = pi.next_action;
                const v = next?.oxxo_display_details || next?.display_bank_transfer_instructions || null;
                setVoucher(v);
                setVoucherType(next?.type || null);

                if (snapshot) {
                    try {
                        await fetch(`${API_URL}/api/save-order`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                stripePaymentIntentId: pi.id,
                                paymentProvider: 'stripe',
                                paymentStatus: 'pending',
                                customerInfo: snapshot.customerInfo,
                                orderDetails: snapshot.orderDetails,
                            }),
                        });
                    } catch (e) {
                        console.error('Pending order save failed:', e);
                    }
                    clearCart();
                }
                setStatus('processing');
            } else {
                setStatus('failed');
                setErrorMsg(`Payment was not completed (status: ${pi.status})`);
            }
        })();

        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (status === 'loading') {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper sx={{ p: 4 }}>
                {status === 'succeeded' && (
                    <Stack alignItems="center" spacing={2}>
                        <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main' }} />
                        <Typography variant="h4" fontWeight={700} textAlign="center">
                            Payment Confirmed
                        </Typography>
                        <Typography color="text.secondary" textAlign="center">
                            Reference: <strong>{paymentIntent?.id}</strong>
                        </Typography>
                        {paymentIntent?.amount && (
                            <Typography>
                                Charged: <strong>${(paymentIntent.amount / 100).toFixed(2)} {paymentIntent.currency?.toUpperCase()}</strong>
                            </Typography>
                        )}
                        <Alert severity="info">
                            We've sent a confirmation email. Check inbox and spam.
                        </Alert>
                        <Button variant="contained" onClick={() => navigate('/services')}>
                            Continue
                        </Button>
                    </Stack>
                )}

                {status === 'processing' && (
                    <Stack spacing={2}>
                        <Typography variant="h5" fontWeight={700}>
                            Payment Pending
                        </Typography>
                        <Typography color="text.secondary">
                            Reference: <strong>{paymentIntent?.id}</strong>
                        </Typography>
                        <StripeVoucherDisplay voucher={voucher} paymentMethod={voucherType} />
                        <Button component={Link} to="/" variant="outlined">
                            Back to home
                        </Button>
                    </Stack>
                )}

                {status === 'failed' && (
                    <Stack alignItems="center" spacing={2}>
                        <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
                        <Typography variant="h5" fontWeight={700}>Payment failed</Typography>
                        <Alert severity="error">{errorMsg || 'The payment could not be completed.'}</Alert>
                        <Button component={Link} to="/checkout" variant="contained">
                            Try again
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
};

export default CheckoutReturn;
