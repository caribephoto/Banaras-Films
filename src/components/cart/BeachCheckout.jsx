import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Divider,
    Alert,
    Stack,
    Card,
    Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useBeachCart } from '../../context/BeachCartContext';
import { useCountry } from '../../context/CountryContext';
import { useDocumentTitle, useTakeMeToTheTop } from '../../hooks/hooks';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BeachCheckout = () => {
    useDocumentTitle('Beach Checkout');
    useTakeMeToTheTop();
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useBeachCart();
    const { country, formatCurrency, taxRate, taxLabel, currency, paymentProviders } = useCountry();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        hotel: '',
        sessionDate: '',
        sessionTime: '',
        pax: '',
        notes: '',
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);

    const venueLabel = cart[0]?.venueLabel || 'Beach (Dominican Republic)';

    // Minimum booking lead time: 3 days from today (sessions must be booked
    // at least 72h in advance). Used both as the date input `min` and in validation.
    const MIN_LEAD_DAYS = 3;
    const minSessionDate = (() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + MIN_LEAD_DAYS);
        const off = d.getTimezoneOffset();
        return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
    })();

    const subtotal = getCartTotal();
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    const validateForm = useCallback(() => {
        const errors = {};
        let valid = true;

        if (!customerInfo.name?.trim() || customerInfo.name.trim().length < 2) {
            errors.name = 'Name is required (min 2 chars)';
            valid = false;
        }
        if (!customerInfo.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email.trim())) {
            errors.email = 'Valid email is required';
            valid = false;
        }
        if (!customerInfo.phone?.trim()) {
            errors.phone = 'Phone is required';
            valid = false;
        } else {
            const digits = customerInfo.phone.replace(/[\s\-()+]/g, '');
            if (!/^\d{8,15}$/.test(digits)) {
                errors.phone = 'Invalid phone number';
                valid = false;
            }
        }
        if (!customerInfo.hotel?.trim() || customerInfo.hotel.trim().length < 2) {
            errors.hotel = 'Hotel is required';
            valid = false;
        }
        if (!customerInfo.sessionDate) {
            errors.sessionDate = 'Session date is required';
            valid = false;
        } else if (customerInfo.sessionDate < minSessionDate) {
            errors.sessionDate = `Minimum booking time is ${MIN_LEAD_DAYS} days in advance`;
            valid = false;
        }
        if (!customerInfo.sessionTime) {
            errors.sessionTime = 'Session time is required';
            valid = false;
        }
        if (!customerInfo.pax || parseInt(customerInfo.pax, 10) <= 0) {
            errors.pax = 'Number of PAX is required';
            valid = false;
        }
        return { errors, valid };
    }, [customerInfo]);

    useEffect(() => {
        const { errors, valid } = validateForm();
        setFieldErrors(errors);
        setFormIsValid(valid);
    }, [validateForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((p) => ({ ...p, [name]: value }));
    };

    const buildPersistencePayload = () => ({
        customerInfo: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            hotel: customerInfo.hotel,   // hotel where the guest stays = pickup point
            hotel_id: null,
            venue: venueLabel,           // beach location label shown in the email
            country: country?.code,
            sessionDate: customerInfo.sessionDate,
            sessionTime: customerInfo.sessionTime,
            pax: customerInfo.pax,
            notes: customerInfo.notes,
            // Mirror sessionDate into wedding_date so the orders.wedding_date column
            // (NOT NULL legacy) keeps a meaningful value for analytics.
            weddingDate: customerInfo.sessionDate,
        },
        orderDetails: {
            items: cart.map((i) => ({
                id: i.id,
                title: i.title,
                quantity: i.quantity || 1,
                price: i.numericPrice,
            })),
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
            currency,
            orderType: 'beach-session',
        },
    });

    const completeAndShow = async (orderId, isDuplicate) => {
        const payload = buildPersistencePayload();
        if (!isDuplicate) {
            try {
                await fetch(`${API_URL}/api/send-beach-session-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customerInfo: payload.customerInfo,
                        orderDetails: { ...payload.orderDetails, orderId },
                    }),
                });
            } catch (e) {
                console.error('Email send failed:', e);
            }
        }
        setOrderDetails({ id: orderId });
        setOrderTotal(total);
        setOrderComplete(true);
        clearCart();
    };

    // PayPal handlers
    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
        currency,
        intent: 'capture',
    };
    const createPayPalOrder = (data, actions) =>
        actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: { currency_code: currency, value: subtotal.toFixed(2) },
                            tax_total: { currency_code: currency, value: tax.toFixed(2) },
                        },
                    },
                    description: `Beach Session — ${cart.map((c) => c.title).join(', ')}`,
                },
            ],
        });
    const onPayPalApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            const payload = buildPersistencePayload();
            const saveResp = await fetch(`${API_URL}/api/save-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paypalOrderId: details.id,
                    paymentProvider: 'paypal',
                    paymentStatus: 'completed',
                    ...payload,
                }),
            });
            const saveJson = await saveResp.json();
            await completeAndShow(details.id, !!saveJson.data?.isDuplicate);
            toast.success('Payment successful!');
        } catch (err) {
            console.error('PayPal capture error:', err);
            toast.error('Payment capture failed. Please contact support.');
        }
    };

    if (cart.length === 0 && !orderComplete) {
        navigate('/beach-sessions/cart');
        return null;
    }

    if (orderComplete) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="md">
                    <Card component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} sx={{ p: 4, textAlign: 'center' }}>
                        <CheckCircleIcon sx={{ fontSize: 80, color: orderDetails?.voucher ? 'warning.main' : 'success.main', mb: 2 }} />
                        <Typography variant="h3" gutterBottom fontWeight="bold" color={orderDetails?.voucher ? 'warning.main' : 'success.main'}>
                            {orderDetails?.voucher ? 'Payment Pending' : 'Order Confirmed!'}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4 }}>
                            Thanks, {customerInfo.name}!
                        </Typography>
                        <Paper sx={{ p: 3, mb: 4, textAlign: 'left', bgcolor: 'background.default' }}>
                            <Stack spacing={1}>
                                <Typography><strong>Order ID:</strong> {orderDetails?.id}</Typography>
                                <Typography><strong>Email:</strong> {customerInfo.email}</Typography>
                                <Typography><strong>Phone:</strong> {customerInfo.phone}</Typography>
                                <Typography><strong>Hotel:</strong> {customerInfo.hotel}</Typography>
                                <Typography><strong>Session date:</strong> {customerInfo.sessionDate}</Typography>
                                <Typography><strong>Session time:</strong> {customerInfo.sessionTime}</Typography>
                                <Typography><strong>Location:</strong> {venueLabel}</Typography>
                                <Typography><strong>PAX:</strong> {customerInfo.pax}</Typography>
                                <Typography>
                                    <strong>Total:</strong>{' '}
                                    <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                        {formatCurrency(orderTotal)}
                                    </Box>
                                </Typography>
                            </Stack>
                        </Paper>
                        <Button variant="contained" size="large" onClick={() => navigate('/beach-sessions')}>
                            Continue
                        </Button>
                    </Card>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
                    Beach Session Checkout
                </Typography>

                <Stack spacing={4}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <BeachAccessIcon color="primary" />
                            <Typography variant="h5" fontWeight="bold">Session Information</Typography>
                            <Chip label={venueLabel} size="small" color="primary" variant="outlined" sx={{ ml: 1 }} />
                        </Stack>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="name" label="Full Name" value={customerInfo.name} onChange={handleChange} error={!!fieldErrors.name} helperText={fieldErrors.name} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="email" type="email" label="Email" value={customerInfo.email} onChange={handleChange} error={!!fieldErrors.email} helperText={fieldErrors.email} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="phone" type="tel" label="Contact phone" value={customerInfo.phone} onChange={handleChange} error={!!fieldErrors.phone} helperText={fieldErrors.phone} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="hotel" label="Hotel where you stay" value={customerInfo.hotel} onChange={handleChange} error={!!fieldErrors.hotel} helperText={fieldErrors.hotel || 'Used as the pickup point (private transport included)'} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="sessionDate" type="date" label="Session date" InputLabelProps={{ shrink: true }} inputProps={{ min: minSessionDate }} value={customerInfo.sessionDate} onChange={handleChange} error={!!fieldErrors.sessionDate} helperText={fieldErrors.sessionDate || `Book at least ${MIN_LEAD_DAYS} days in advance`} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="sessionTime" type="time" label="Session time" InputLabelProps={{ shrink: true }} value={customerInfo.sessionTime} onChange={handleChange} error={!!fieldErrors.sessionTime} helperText={fieldErrors.sessionTime} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField fullWidth required name="pax" type="number" label="PAX" inputProps={{ min: 1 }} value={customerInfo.pax} onChange={handleChange} error={!!fieldErrors.pax} helperText={fieldErrors.pax || 'Up to 4 included; contact us for larger groups'} />
                            </Grid>
                            <Grid size={12}>
                                <TextField fullWidth multiline rows={2} name="notes" label="Notes (optional)" placeholder="Preferred beach, time of day, etc." value={customerInfo.notes} onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Order Summary</Typography>
                                <Stack spacing={1.5}>
                                    {cart.map((item) => (
                                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                                            <Box>
                                                <Typography fontWeight={500}>{item.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                                            </Box>
                                            <Typography fontWeight={600}>{formatCurrency(item.numericPrice * item.quantity)}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Subtotal:</Typography>
                                        <Typography fontWeight={600}>{formatCurrency(subtotal)}</Typography>
                                    </Box>
                                    {taxRate > 0 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography>{taxLabel} ({(taxRate * 100).toFixed(0)}%):</Typography>
                                            <Typography fontWeight={600}>{formatCurrency(tax)}</Typography>
                                        </Box>
                                    )}
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">Total:</Typography>
                                        <Typography variant="h5" color="primary.main" fontWeight="bold">{formatCurrency(total)}</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Payment</Typography>

                                {!formIsValid && (
                                    <Alert severity="warning" sx={{ mb: 2 }}>
                                        Please complete the session info before proceeding.
                                    </Alert>
                                )}

                                <Stack spacing={2}>
                                    {/* Beach sessions are PayPal-only by design. */}
                                    {paymentProviders.paypal && (
                                        <PayPalScriptProvider key={currency} options={initialOptions}>
                                            <PayPalButtons
                                                style={{ layout: 'vertical' }}
                                                createOrder={createPayPalOrder}
                                                onApprove={onPayPalApprove}
                                                onError={(err) => { console.error('PayPal Error:', err); toast.error('Payment failed.'); }}
                                                onCancel={() => toast.info('Payment cancelled.')}
                                                disabled={!formIsValid}
                                            />
                                        </PayPalScriptProvider>
                                    )}

                                    {!paymentProviders.paypal && (
                                        <Alert severity="error">
                                            No payment method available — contact info@caribephoto.com
                                        </Alert>
                                    )}
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
};

export default BeachCheckout;
