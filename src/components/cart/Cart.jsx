import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useDocumentTitle, useTakeMeToTheTop } from '../../hooks/hooks';
import { motion } from 'framer-motion';
import {
    Container,
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Divider,
    Stack,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    useDocumentTitle('Carrito de Compras');
    useTakeMeToTheTop();

    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

    const TAX_RATE = parseFloat(import.meta.env.VITE_TAX_RATE || 0.16);
    const subtotal = getCartTotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(amount);
    };

    if (cart.length === 0) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold">
                        Cart
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                        <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Your cart is empty
                        </Typography>
                        <Button
                            component={Link}
                            to="/services"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 4,
                                background: 'linear-gradient(to right, #ec4899, #db2777)',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #db2777, #be185d)',
                                }
                            }}
                        >
                            See Packages
                        </Button>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
                    Cart
                </Typography>

                <Grid container spacing={4}>
                    {/* Cart Items */}
                    <Grid item xs={12} lg={8}>
                        <Stack spacing={2}>
                            {cart.map((item) => (
                                <Card
                                    component={motion.div}
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        p: 2,
                                        bgcolor: 'background.paper'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', sm: 160 },
                                            height: 160,
                                            objectFit: 'cover',
                                            borderRadius: 2
                                        }}
                                        image={item.img}
                                        alt={item.title}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
                                        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                                            <Typography variant="h6" component="h3" fontWeight="bold">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Category: {item.category}
                                            </Typography>
                                            <Typography variant="h6" color="primary" fontWeight="600">
                                                {item.price}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    sx={{ bgcolor: 'action.hover' }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography
                                                    sx={{
                                                        px: 2,
                                                        py: 0.5,
                                                        bgcolor: 'background.default',
                                                        borderRadius: 1,
                                                        fontWeight: 600,
                                                        minWidth: 40,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    sx={{ bgcolor: 'action.hover' }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                            <IconButton
                                                color="error"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 3,
                                position: { lg: 'sticky' },
                                top: { lg: 100 },
                                bgcolor: 'background.paper'
                            }}
                        >
                            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                                Order Summary
                            </Typography>
                            <Stack spacing={2} sx={{ my: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Subtotal:</Typography>
                                    <Typography fontWeight="600">{formatCurrency(subtotal)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">
                                        IVA ({(TAX_RATE * 100).toFixed(0)}%):
                                    </Typography>
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
                            <Button
                                component={Link}
                                to="/checkout"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    mb: 2,
                                    background: 'linear-gradient(to right, #ec4899, #db2777)',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #db2777, #be185d)',
                                    }
                                }}
                            >
                                Proceed to Payment
                            </Button>
                            <Button
                                component={Link}
                                to="/services"
                                variant="outlined"
                                fullWidth
                                size="large"
                                sx={{
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    '&:hover': {
                                        borderColor: 'primary.dark',
                                        bgcolor: 'action.hover'
                                    }
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Cart;
