import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../../context/CartContext';
import { useCountry } from '../../context/CountryContext';
import { useDocumentTitle, useTakeMeToTheTop } from '../../hooks/hooks';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    CardMedia,
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
    CardContent,
    IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import HotelSelector from './HotelSelector';
import hotels from '../../utils/hotelData';
import { hasDronePackage, getAvailableHotels, getHotelsByCountry, validateCartForCheckout, isHotelAllowed } from '../../utils/cartValidation';
import TransportAddon from './TransportAddon';
import { validateTransport } from '../../utils/transportValidation';
import StripePaymentForm from './StripePaymentForm';
import StripeVoucherDisplay from './StripeVoucherDisplay';

const Checkout = () => {
    useDocumentTitle('Checkout');
    useTakeMeToTheTop();

    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();
    const { country, formatCurrency, taxRate, taxLabel, currency, paymentProviders } = useCountry();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        hotel: '',
        groomName: '',
        brideName: '',
        weddingDate: '',
        pax: ''
    });

    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        phone: '',
        hotel: '',
        groomName: '',
        brideName: '',
        weddingDate: '',
        pax: ''
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const [orderComplete, setOrderComplete] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedHotelPreview, setSelectedHotelPreview] = useState(null);
    const [transport, setTransport] = useState(null);
    const [stripeVoucher, setStripeVoucher] = useState(null);
    const [stripeVoucherType, setStripeVoucherType] = useState(null);

    // Drop a stale hotel selection and transport add-on if the user switches destination country mid-flow.
    useEffect(() => {
        if (selectedHotel) {
            const stillValid = hotels.some(h => h.id === selectedHotel && h.country === country?.code);
            if (!stillValid) {
                setSelectedHotel(null);
                setCustomerInfo(prev => ({ ...prev, hotel: '' }));
            }
        }
        if (country?.code !== 'MX' && transport) {
            setTransport(null);
        }
    }, [country?.code, selectedHotel, transport]);

    const transportPriceUSD = transport?.priceUSD || 0;
    const subtotal = getCartTotal() + transportPriceUSD;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const transportValidation = transport ? validateTransport(transport) : { valid: true, errors: {} };
    const transportPriceMissing = !!transport && transportPriceUSD <= 0;

    // Función de validación memoizada
    const validateForm = useCallback(() => {
        const errors = {
            name: '',
            email: '',
            phone: ''
        };

        let isValid = true;

        // Validar nombre
        if (!customerInfo.name || customerInfo.name.trim().length === 0) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (customerInfo.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/.test(customerInfo.name.trim())) {
            errors.name = 'Name contains invalid characters';
            isValid = false;
        }

        // Validar email
        if (!customerInfo.email || customerInfo.email.trim().length === 0) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email.trim())) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Validar teléfono
        if (!customerInfo.phone || customerInfo.phone.trim().length === 0) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else {
            const cleanPhone = customerInfo.phone.replace(/[\s\-()]/g, '');

            if (!/^\+?[0-9]+$/.test(cleanPhone)) {
                errors.phone = 'Phone number must contain only digits and optional +';
                isValid = false;
            } else {
                const digitsOnly = cleanPhone.replace('+', '');
                if (digitsOnly.length < 8) {
                    errors.phone = 'Phone number is too short';
                    isValid = false;
                } else if (digitsOnly.length > 15) {
                    errors.phone = 'Phone number is too long';
                    isValid = false;
                }
            }
        }

        // Validar hotel
        if (selectedHotel === null || selectedHotel === undefined) {
            errors.hotel = 'Please select your wedding venue';
            isValid = false;
        }

        // Validate Wedding Info
        if (!customerInfo.groomName || customerInfo.groomName.trim().length === 0) {
            errors.groomName = "Groom's name is required";
            isValid = false;
        }

        if (!customerInfo.brideName || customerInfo.brideName.trim().length === 0) {
            errors.brideName = "Bride's name is required";
            isValid = false;
        }

        if (!customerInfo.weddingDate) {
            errors.weddingDate = 'Wedding date is required';
            isValid = false;
        }

        if (!customerInfo.pax || customerInfo.pax <= 0) {
            errors.pax = 'Valid number of guests (PAX) is required';
            isValid = false;
        }

        return { errors, isValid };
    }, [customerInfo, selectedHotel]);

    // Efecto para validar el formulario cuando cambian los datos
    useEffect(() => {
        const validation = validateForm();
        setFieldErrors(validation.errors);
        const transportOk = !transport || (transportValidation.valid && !transportPriceMissing);
        setFormIsValid(validation.isValid && transportOk);
    }, [validateForm, transport, transportValidation.valid, transportPriceMissing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validar al perder el foco
    const handleBlur = (e) => {
        const { name } = e.target;
        const validation = validateForm();
        setFieldErrors(prev => ({
            ...prev,
            [name]: validation.errors[name]
        }));
    };

    const handleHotelSelect = (hotelId) => {
        // Validate if hotel is allowed with current cart (drone restrictions)
        const hotelCheck = isHotelAllowed(cart, hotelId);

        if (!hotelCheck.allowed) {
            toast.error(hotelCheck.reason);
            // Don't allow selection
            return;
        }

        setSelectedHotel(hotelId);
        // Clear hotel error when selected
        setFieldErrors(prev => ({
            ...prev,
            hotel: ''
        }));
    };

    const getSelectedHotelName = () => {
        const hotel = hotels.find(h => h.id === selectedHotel);
        return hotel ? hotel.name : '';
    };

    // PayPal configuration — currency comes from selected country.
    // PayPalScriptProvider must remount when currency changes (see `key` prop below).
    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
        currency: currency,
        intent: 'capture',
    };

    const createOrder = (data, actions) => {
        const validation = validateForm();

        if (!validation.isValid) {
            // Mostrar todos los errores
            setFieldErrors(validation.errors);
            toast.error('Please complete all customer information correctly.');
            return Promise.reject();
        }

        // Validate cart for checkout (drone restrictions)
        const cartValidation = validateCartForCheckout(cart, selectedHotel);
        if (!cartValidation.valid) {
            cartValidation.errors.forEach(error => toast.error(error));
            return Promise.reject();
        }

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
                    hotel: getSelectedHotelName(),
                    country: country?.code,
                    groomName: customerInfo.groomName,
                    brideName: customerInfo.brideName,
                    weddingDate: customerInfo.weddingDate,
                    pax: customerInfo.pax
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
                    currency: currency,
                    transport: transport || null
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

    const onApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();

            setOrderDetails(details);
            setOrderTotal(total);
            setOrderComplete(true);

            // 1. Save order to Supabase database
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

                const saveResponse = await fetch(`${API_URL}/api/save-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paypalOrderId: details.id,
                        customerInfo: {
                            ...customerInfo,
                            hotel_id: selectedHotel,
                            country: country?.code
                        },
                        orderDetails: {
                            items: cart.map(item => ({
                                id: item.id,
                                title: item.title,
                                quantity: item.quantity || 1,
                                price: item.numericPrice
                            })),
                            subtotal: parseFloat(subtotal.toFixed(2)),
                            tax: parseFloat(tax.toFixed(2)),
                            total: parseFloat(total.toFixed(2)),
                            currency: currency,
                            transport: transport || null
                        }
                    })
                });

                const saveResult = await saveResponse.json();

                if (saveResult.success) {
                    console.log('✅ Order saved to database:', saveResult.data);
                } else {
                    console.warn('⚠️ Order not saved to database:', saveResult.message);
                }
            } catch (saveError) {
                console.error('❌ Error saving order to database:', saveError);
                // Don't block the flow if Supabase fails
            }

            // 2. Send order confirmation email
            await sendOrderEmail(details.id, cart);

            // 3. Clear cart and show success
            clearCart();
            toast.success('Payment successful! Thank you for your order.');

        } catch (error) {
            console.error('PayPal capture error:', error);
            toast.error('Payment capture failed. Please contact support.');
        }
    };

    const onError = (err) => {
        console.error('PayPal Error:', err);
        toast.error('Payment failed. Please try again.');
    };

    const onCancel = (data) => {
        console.log('Payment cancelled:', data);
        toast.info('Payment process was cancelled.');
    };

    // Build the payload shared by all payment providers when persisting the order.
    const buildOrderPersistencePayload = () => ({
        customerInfo: {
            ...customerInfo,
            hotel: getSelectedHotelName(),
            hotel_id: selectedHotel,
            country: country?.code,
        },
        orderDetails: {
            items: cart.map((item) => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity || 1,
                price: item.numericPrice,
            })),
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
            currency: currency,
            transport: transport || null,
        },
    });

    const onStripeSuccess = async (paymentIntentId) => {
        try {
            const payload = buildOrderPersistencePayload();
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            // Save order (idempotent: webhook may have run first)
            let saveResult = { success: false };
            try {
                const resp = await fetch(`${API_URL}/api/save-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...payload,
                        stripePaymentIntentId: paymentIntentId,
                        paymentProvider: 'stripe',
                        paymentStatus: 'completed',
                    }),
                });
                saveResult = await resp.json();
            } catch (e) {
                console.error('Stripe save-order failed:', e);
            }

            // Only send email if this was a fresh insert (avoid duplicate vs webhook)
            const isDuplicate = saveResult?.data?.isDuplicate === true;
            if (!isDuplicate) {
                await sendOrderEmail(paymentIntentId, cart);
            }

            setOrderDetails({ id: paymentIntentId });
            setOrderTotal(total);
            setOrderComplete(true);
            clearCart();
            toast.success('Payment successful! Thank you for your order.');
        } catch (err) {
            console.error('Stripe success handler error:', err);
            toast.error('Payment captured but we could not finalize the order. We will contact you.');
        }
    };

    const onStripePending = async (paymentIntentId, voucher, paymentMethodType) => {
        try {
            const payload = buildOrderPersistencePayload();
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            try {
                await fetch(`${API_URL}/api/save-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...payload,
                        stripePaymentIntentId: paymentIntentId,
                        paymentProvider: 'stripe',
                        paymentStatus: 'pending',
                    }),
                });
            } catch (e) {
                console.error('Pending save-order failed:', e);
            }

            setStripeVoucher(voucher);
            setStripeVoucherType(paymentMethodType);
            setOrderDetails({ id: paymentIntentId, voucher: true });
            setOrderTotal(total);
            setOrderComplete(true);
            clearCart();
            toast.info('Order saved. Complete the payment to receive your confirmation email.');
        } catch (err) {
            console.error('Stripe pending handler error:', err);
            toast.error('We could not save your pending order. Please contact us.');
        }
    };

    const onStripeError = (err) => {
        console.error('Stripe Error:', err);
        toast.error(err?.message || 'Payment failed. Please try again.');
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
                        <CheckCircleIcon sx={{ fontSize: 80, color: orderDetails?.voucher ? 'warning.main' : 'success.main', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color={orderDetails?.voucher ? 'warning.main' : 'success.main'}>
                            {orderDetails?.voucher ? 'Payment Pending' : 'Order Confirmed!'}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
                            {orderDetails?.voucher
                                ? `${customerInfo.name}, complete the payment to confirm your order.`
                                : `Thank you for your purchase, ${customerInfo.name}!`}
                        </Typography>

                        {orderDetails?.voucher && (
                            <Box sx={{ mb: 4 }}>
                                <StripeVoucherDisplay voucher={stripeVoucher} paymentMethod={stripeVoucherType} />
                            </Box>
                        )}
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
                                    <strong>Wedding Venue:</strong> {getSelectedHotelName()}
                                </Typography>
                                <Typography>
                                    <strong>Couple:</strong> {customerInfo.groomName} & {customerInfo.brideName}
                                </Typography>
                                <Typography>
                                    <strong>Date:</strong> {customerInfo.weddingDate}
                                </Typography>
                                <Typography>
                                    <strong>Total Paid:</strong>{' '}
                                    <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                        {formatCurrency(orderTotal)}
                                    </Box>
                                </Typography>
                            </Stack>
                        </Paper>
                        {orderDetails?.voucher ? (
                            <Typography color="text.secondary" paragraph sx={{ mb: 2 }}>
                                You'll receive a confirmation email at <strong>{customerInfo.email}</strong> once payment is detected.
                            </Typography>
                        ) : (
                            <>
                                <Typography color="text.secondary" paragraph sx={{ mb: 2 }}>
                                    ✓ Confirmation email sent to: <strong>{customerInfo.email}</strong>
                                </Typography>
                                <Alert
                                    severity="info"
                                    sx={{
                                        bgcolor: 'rgba(33, 150, 243, 0.1)',
                                        '& .MuiAlert-icon': { color: 'info.main' },
                                        mb: 2
                                    }}
                                >
                                    <Typography variant="body2">
                                        <strong>Important:</strong> Check both your inbox and spam folder for our email.
                                    </Typography>
                                </Alert>
                            </>
                        )}
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

    {/* Hotel Selection with confirmation modal */ }
    if (!selectedHotel) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>

                <Box sx={{ position: 'relative' }}>
                    {fieldErrors.hotel && (
                        <Alert
                            severity="error"
                            sx={{
                                position: 'absolute',
                                top: { xs: -50, md: -50, lg: 10 },
                                right: { xs: 20, md: 20, lg: 20 },

                            }}
                        >
                            {fieldErrors.hotel}
                        </Alert>
                    )}

                    <Container maxWidth="lg">
                        <Typography
                            variant="h3"
                            component="h1"
                            align="center"
                            gutterBottom
                            fontWeight="bold"
                            sx={{ mb: 2 }}
                        >
                            Select Your Wedding Venue
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 6 }}
                        >
                            Choose the perfect location for your special day
                        </Typography>
                        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
                            {getHotelsByCountry(hotels, country?.code).map((hotel) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={hotel.id}
                                    sx={{ display: 'flex' }}  // contenedor flex de item
                                >
                                    <Card
                                        component={motion.div}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0px 10px 30px rgba(236, 72, 153, 0.3)",
                                        }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                        sx={{
                                            height: '100%',                 // importante: tarjeta toma todo el alto del Grid item
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 3,
                                            overflow: 'hidden',
                                            maxWidth: 250,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setSelectedHotelPreview(hotel)}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: 180,
                                                flexShrink: 0,
                                            }}
                                            image={hotel.image || '/hotel-placeholder.jpg'}
                                            alt={hotel.name}
                                        />
                                        <CardContent sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 2.5
                                        }}>
                                            <Typography variant="h6" component="h3" gutterBottom fontWeight="bold" sx={{ mb: 1 }}>
                                                {hotel.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <PlaceIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {hotel.location}
                                                </Typography>
                                            </Box>
                                            {hotel.rating && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <StarIcon sx={{ color: '#ffc107', fontSize: 18, mr: 0.5 }} />
                                                    <Typography variant="body2" fontWeight="600">
                                                        {hotel.rating} / 5.0
                                                    </Typography>
                                                </Box>
                                            )}
                                            {/* Si agregas descripción, asegurate de truncarla o limitar líneas */}
                                            <Box sx={{ mt: 'auto' }}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedHotelPreview(hotel);
                                                    }}
                                                    sx={{
                                                        background: 'linear-gradient(to right, #ec4899, #db2777)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(to right, #db2777, #be185d)',
                                                        },
                                                    }}
                                                >
                                                    Select Venue
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Confirmation Dialog */}
                        <Dialog
                            open={!!selectedHotelPreview}
                            onClose={() => setSelectedHotelPreview(null)}
                            maxWidth="md"
                            fullWidth
                            PaperProps={{
                                sx: {
                                    borderRadius: 3,
                                }
                            }}
                        >
                            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', pb: 1 }}>
                                Confirm Your Selection
                            </DialogTitle>
                            <DialogContent>
                                {selectedHotelPreview && (
                                    <>
                                        {/*  <CardMedia
                                        component="img"
                                        height="50%"
                                        width="50%"
                                        image={selectedHotelPreview.image}
                                        alt={selectedHotelPreview.name}
                                        sx={{ borderRadius: 2, mb: 3, objectFit: 'contain' }}
                                    />*/}
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                                            {selectedHotelPreview.name}
                                        </Typography>
                                        <Box sx={{ mb: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                                <PlaceIcon sx={{ mr: 1, color: 'primary.main', mt: 0.5 }} />
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary" fontWeight="600">
                                                        Location
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {selectedHotelPreview.location}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            {selectedHotelPreview.rating && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <StarIcon sx={{ color: '#ffc107', fontSize: 20, mr: 1 }} />
                                                    <Typography variant="body1">
                                                        Rating: <strong>{selectedHotelPreview.rating}</strong> / 5.0
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                                                {selectedHotelPreview.description}
                                            </Typography>
                                            {selectedHotelPreview.features && selectedHotelPreview.features.length > 0 && (
                                                <Box sx={{ mt: 2 }}>
                                                    <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ mb: 1 }}>
                                                        Features & Amenities
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {selectedHotelPreview.features.map((feature, index) => (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    bgcolor: 'action.hover',
                                                                    px: 1.5,
                                                                    py: 0.5,
                                                                    borderRadius: 1,
                                                                }}
                                                            >
                                                                <CheckCircleIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.main' }} />
                                                                <Typography variant="body2">{feature}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            )}
                                            {selectedHotelPreview.capacity && (
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                                    <strong>Capacity:</strong> {selectedHotelPreview.capacity}
                                                </Typography>
                                            )}
                                            {selectedHotelPreview.url && (
                                                <Button
                                                    variant="outlined"
                                                    href={selectedHotelPreview.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{ mt: 2 }}
                                                    fullWidth
                                                >
                                                    View on Google Maps
                                                </Button>
                                            )}
                                        </Box>
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions sx={{ px: 3, pb: 3 }}>
                                <Button
                                    onClick={() => setSelectedHotelPreview(null)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleHotelSelect(selectedHotelPreview.id);
                                        setSelectedHotelPreview(null);
                                    }}
                                    sx={{
                                        textTransform: 'none',
                                        background: 'linear-gradient(to right, #ec4899, #db2777)',
                                        '&:hover': {
                                            background: 'linear-gradient(to right, #db2777, #be185d)',
                                        },
                                    }}
                                >
                                    Confirm Selection
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Container>
                </Box>

            </Box>
        );
    }


    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 6
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

                <Stack spacing={4}>
                    {/* Customer Information & Wedding Information - Full Width */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            Customer Information
                        </Typography>
                        <Stack spacing={3}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={customerInfo.name}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.name}
                                        helperText={fieldErrors.name}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={customerInfo.email}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.email}
                                        helperText={fieldErrors.email}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={customerInfo.phone}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.phone}
                                        helperText={fieldErrors.phone}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Hotel"
                                        name="hotel"
                                        type="text"
                                        value={getSelectedHotelName()}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.hotel}
                                        helperText={fieldErrors.hotel}
                                        InputProps={{
                                            endAdornment: selectedHotel && (
                                                <IconButton
                                                    onClick={() => setSelectedHotel(null)}
                                                    edge="end"
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" component="h3" fontWeight="bold">
                                Wedding Information
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Groom's Name"
                                        name="groomName"
                                        value={customerInfo.groomName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.groomName}
                                        helperText={fieldErrors.groomName}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Bride's Name"
                                        name="brideName"
                                        value={customerInfo.brideName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.brideName}
                                        helperText={fieldErrors.brideName}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Wedding Date"
                                        name="weddingDate"
                                        type="date"
                                        value={customerInfo.weddingDate}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        error={!!fieldErrors.weddingDate}
                                        helperText={fieldErrors.weddingDate}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Pax (Guests)"
                                        name="pax"
                                        type="number"
                                        value={customerInfo.pax}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        required
                                        variant="outlined"
                                        error={!!fieldErrors.pax}
                                        helperText={fieldErrors.pax}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>

                    {country?.code === 'MX' && (
                        <TransportAddon
                            value={transport}
                            onChange={setTransport}
                            hotelAddress={getSelectedHotelName()}
                        />
                    )}

                    <Grid container spacing={4}>
                        {/* Order Summary */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 2
                                }}
                            >
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                                    Order Summary
                                </Typography>
                                <Stack spacing={1.5} sx={{ my: 2 }}>
                                    {cart.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                py: 1.5,
                                                borderBottom: '1px solid',
                                                borderColor: 'divider'
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body1" fontWeight="500">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Qty: {item.quantity}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" fontWeight="600">
                                                {formatCurrency(item.numericPrice * item.quantity)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                {transport && transportPriceUSD > 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1.5,
                                            borderBottom: '1px solid',
                                            borderColor: 'divider'
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body1" fontWeight="500">
                                                Transport · {transport.vehicleType || 'vehicle'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {transport.tripType} · {transport.pax} pax
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" fontWeight="600">
                                            {formatCurrency(transportPriceUSD)}
                                        </Typography>
                                    </Box>
                                )}
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body1">Subtotal:</Typography>
                                        <Typography variant="body1" fontWeight="600">{formatCurrency(subtotal)}</Typography>
                                    </Box>
                                    {taxRate > 0 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body1">{taxLabel} ({(taxRate * 100).toFixed(0)}%):</Typography>
                                            <Typography variant="body1" fontWeight="600">{formatCurrency(tax)}</Typography>
                                        </Box>
                                    )}
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">Total:</Typography>
                                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                                            {formatCurrency(total)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Payment */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 2
                                }}
                            >
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                                    Payment
                                </Typography>

                                <Stack spacing={2} sx={{ height: '100%' }}>
                                    <Box sx={{
                                        minHeight: 60,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {!formIsValid ? (
                                            <Alert
                                                severity="warning"
                                                sx={{
                                                    width: '100%',
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
                                                Please complete all information before proceeding
                                            </Alert>
                                        ) : (
                                            <Alert
                                                severity="success"
                                                sx={{
                                                    width: '100%',
                                                    bgcolor: 'rgba(46, 125, 50, 0.1)',
                                                    border: '1px solid',
                                                    borderColor: 'success.main',
                                                    '& .MuiAlert-icon': {
                                                        color: 'success.main',
                                                    },
                                                    '& .MuiAlert-message': {
                                                        color: 'text.primary',
                                                        fontWeight: 500,
                                                    }
                                                }}
                                            >
                                                ✓ Ready to proceed with payment
                                            </Alert>
                                        )}
                                    </Box>

                                    <Box sx={{ mt: 'auto' }}>
                                        {paymentProviders.stripe && (
                                            <StripePaymentForm
                                                amountUSD={total}
                                                customerInfo={{
                                                    ...customerInfo,
                                                    hotel: getSelectedHotelName(),
                                                    hotel_id: selectedHotel,
                                                    country: country?.code,
                                                }}
                                                orderDetails={{
                                                    items: cart.map((item) => ({
                                                        id: item.id,
                                                        title: item.title,
                                                        quantity: item.quantity || 1,
                                                        price: item.numericPrice,
                                                    })),
                                                    subtotal,
                                                    tax,
                                                    total,
                                                    transport,
                                                }}
                                                disabled={!formIsValid}
                                                onSuccess={onStripeSuccess}
                                                onPending={onStripePending}
                                                onError={onStripeError}
                                            />
                                        )}

                                        {paymentProviders.stripe && paymentProviders.paypal && (
                                            <Divider sx={{ my: 2 }}>OR</Divider>
                                        )}

                                        {paymentProviders.paypal && (
                                            <PayPalScriptProvider key={currency} options={initialOptions}>
                                                <PayPalButtons
                                                    style={{ layout: 'vertical' }}
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                    onCancel={onCancel}
                                                    disabled={!formIsValid}
                                                />
                                            </PayPalScriptProvider>
                                        )}

                                        {!paymentProviders.paypal && !paymentProviders.stripe && (
                                            <Alert severity="error">
                                                No payment method available — please contact us at info@caribephoto.com
                                            </Alert>
                                        )}
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
};

export default Checkout;