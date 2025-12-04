import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../../context/CartContext';
import { useDocumentTitle, useTakeMeToTheTop } from '../../hooks/hooks';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
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
    CardContent
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Checkout = () => {
    useDocumentTitle('Checkout');
    useTakeMeToTheTop();

    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [orderComplete, setOrderComplete] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);

    const TAX_RATE = parseFloat(import.meta.env.VITE_TAX_RATE || 0.16);
    const subtotal = getCartTotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MXN',
        }).format(amount);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return customerInfo.name && customerInfo.email && customerInfo.phone;
    };

    // PayPal configuration
    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
        currency: import.meta.env.VITE_CURRENCY || 'MXN',
        intent: 'capture',
    };

    const createOrder = (data, actions) => {
        if (!isFormValid()) {
            toast.error('Please complete all customer information.');
            return Promise.reject();
        }

        const currency = import.meta.env.VITE_CURRENCY || 'MXN';

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: currency,
                                value: subtotal.toFixed(2),
                            },
                            tax_total: {
                                currency_code: currency,
                                value: tax.toFixed(2),
                            },
                        },
                    },
                    description: `CaribPhoto Order - ${cart.length} package(s)`,
                },
            ],
        });
    };

    // Send order confirmation email
    const sendOrderEmail = async (orderId, items) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const emailData = {
                customerInfo: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                },
                orderDetails: {
                    orderId: orderId,
                    items: items.map(item => ({
                        title: item.title,
                        quantity: item.quantity || 1,
                        price: item.numericPrice,
                    })),
                    subtotal: subtotal,
                    tax: tax,
                    total: total,
                },
            };

            const response = await fetch(`${API_URL}/api/send-order-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const result = await response.json();

            if (result.success) {
                console.log('✅ Order confirmation emails sent successfully');
            } else {
                console.error('❌ Failed to send emails:', result.message);
                toast.warning('Order confirmed, but email notification failed. We will contact you soon.');
            }
        } catch (error) {
            console.error('❌ Error sending email:', error);
            toast.warning('Order confirmed, but email notification failed. We will contact you soon.');
        }
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            setOrderDetails(details);
            setOrderTotal(total);
            setOrderComplete(true);

            // Send order confirmation email
            sendOrderEmail(details.id, cart);

            clearCart();
            toast.success('Payment successful! Thank you for your order.');
        });
    };

    const onError = (err) => {
        console.error('PayPal Error:', err);
        toast.error('Payment failed. Please try again.');
    };

    if (cart.length === 0 && !orderComplete) {
        navigate('/cart');
        return null;
    }

    if (orderComplete) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="md">
                    <Card
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        sx={{ p: 4, textAlign: 'center' }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="success.main">
                            Order Confirmed!
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
                            Thank you for your purchase, {customerInfo.name}!
                        </Typography>
                        <Paper sx={{ p: 3, mb: 4, textAlign: 'left', bgcolor: 'background.default' }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Order Details
                            </Typography>
                            <Stack spacing={1}>
                                <Typography>
                                    <strong>Order ID:</strong> {orderDetails?.id}
                                </Typography>
                                <Typography>
                                    <strong>Email:</strong> {customerInfo.email}
                                </Typography>
                                <Typography>
                                    <strong>Phone:</strong> {customerInfo.phone}
                                </Typography>
                                <Typography>
                                    <strong>Total Paid:</strong>{' '}
                                    <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                        {formatCurrency(orderTotal)}
                                    </Box>
                                </Typography>
                            </Stack>
                        </Paper>
                        <Typography color="text.secondary" paragraph>
                            A confirmation email has been sent to {customerInfo.email}
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/services')}
                            sx={{
                                background: 'linear-gradient(to right, #ec4899, #db2777)',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #db2777, #be185d)',
                                }
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Card>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            py: { xs: 4, md: 8 }
        }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    component="h1"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                    sx={{ mb: 6 }}
                >
                    Checkout
                </Typography>

                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {/* Customer Information */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                Customer Information
                            </Typography>
                            <Stack spacing={3} sx={{ mt: 3, flex: 1 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    required
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={handleInputChange}
                                    required
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    required
                                    variant="outlined"
                                />
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Order Summary & Payment */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3} height="100%">
                            {/* Order Summary */}
                            <Paper sx={{ p: 3, flex: 1 }}>
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                    Order Summary
                                </Typography>
                                <Stack spacing={1} sx={{ my: 2 }}>
                                    {cart.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                py: 1,
                                                borderBottom: 1,
                                                borderColor: 'divider'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {item.title} x {item.quantity}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="600">
                                                {formatCurrency(item.numericPrice * item.quantity)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Subtotal:</Typography>
                                        <Typography fontWeight="600">{formatCurrency(subtotal)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>VAT ({(TAX_RATE * 100).toFixed(0)}%):</Typography>
                                        <Typography fontWeight="600">{formatCurrency(tax)}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" fontWeight="bold">Total:</Typography>
                                        <Typography variant="h6" color="primary" fontWeight="bold">
                                            {formatCurrency(total)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            {/* Payment */}
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                    Payment
                                </Typography>
                                {!isFormValid() && (
                                    <Alert
                                        severity="warning"
                                        sx={{
                                            mb: 2,
                                            bgcolor: 'rgba(255, 152, 0, 0.1)',
                                            border: '1px solid',
                                            borderColor: 'warning.main',
                                            '& .MuiAlert-icon': {
                                                color: 'warning.main',
                                            },
                                            '& .MuiAlert-message': {
                                                color: 'text.primary',
                                                fontWeight: 500,
                                            }
                                        }}
                                    >
                                        Please complete all customer information before proceeding with payment.
                                    </Alert>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <PayPalScriptProvider options={initialOptions}>
                                        <PayPalButtons
                                            style={{ layout: 'vertical' }}
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                            disabled={!isFormValid()}
                                        />
                                    </PayPalScriptProvider>
                                </Box>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Checkout;
