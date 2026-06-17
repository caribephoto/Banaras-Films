import React from 'react';
import { Link } from 'react-router-dom';
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
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { motion } from 'framer-motion';
import { useBeachCart } from '../../context/BeachCartContext';
import { useCountry } from '../../context/CountryContext';
import { useDocumentTitle, useTakeMeToTheTop } from '../../hooks/hooks';

const BeachCart = () => {
    useDocumentTitle('Beach Cart');
    useTakeMeToTheTop();

    const { cart, removeFromCart, updateQuantity, getCartTotal } = useBeachCart();
    const { formatCurrency, taxRate, taxLabel } = useCountry();

    const subtotal = getCartTotal();
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                        Beach Sessions Cart
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                        <BeachAccessIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Your beach cart is empty
                        </Typography>
                        <Button
                            component={Link}
                            to="/beach-sessions"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 4,
                                background: 'linear-gradient(to right, #ec4899, #db2777)',
                                '&:hover': { background: 'linear-gradient(to right, #db2777, #be185d)' },
                            }}
                        >
                            Browse Beach Sessions
                        </Button>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
                    Beach Sessions Cart
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Stack spacing={2}>
                            {cart.map((item) => (
                                <Card
                                    component={motion.div}
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        p: 2,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: '100%', sm: 160 },
                                            height: 160,
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                        }}
                                        image={item.img}
                                        alt={item.title}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
                                        <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {item.category}
                                            </Typography>
                                            <Typography variant="h6" color="primary" fontWeight="600">
                                                {formatCurrency(item.numericPrice)}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ bgcolor: 'action.hover' }}>
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ px: 2, py: 0.5, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ bgcolor: 'action.hover' }}>
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                            <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Paper
                            sx={{
                                p: 3,
                                position: { lg: 'sticky' },
                                top: { lg: 100 },
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Typography variant="h5" gutterBottom fontWeight="bold">
                                Order Summary
                            </Typography>
                            <Stack spacing={2} sx={{ my: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Subtotal:</Typography>
                                    <Typography fontWeight="600">{formatCurrency(subtotal)}</Typography>
                                </Box>
                                {taxRate > 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography color="text.secondary">
                                            {taxLabel} ({(taxRate * 100).toFixed(0)}%):
                                        </Typography>
                                        <Typography fontWeight="600">{formatCurrency(tax)}</Typography>
                                    </Box>
                                )}
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
                                to="/beach-sessions/checkout"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    mb: 2,
                                    background: 'linear-gradient(to right, #ec4899, #db2777)',
                                    '&:hover': { background: 'linear-gradient(to right, #db2777, #be185d)' },
                                }}
                            >
                                Proceed to Payment
                            </Button>
                            <Button
                                component={Link}
                                to="/beach-sessions"
                                variant="outlined"
                                fullWidth
                                size="large"
                                sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                            >
                                Continue Browsing
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BeachCart;
