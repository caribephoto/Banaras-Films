import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Stack,
    List,
    ListItem,
    ListItemText,
    Link,
    Alert,
    IconButton,
    Badge,
    Dialog,
    DialogContent,
    Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDocumentTitle, useTakeMeToTheTop } from '../hooks/hooks';
import { useCountry } from '../context/CountryContext';
import { useBeachCart } from '../context/BeachCartContext';
import { photoSessions } from '../utils/photoSessionsPackage';
import { staggerContainer } from '../utils/motions';

// Resolve effective USD price for an item, given the active country.
const resolvePrice = (item, countryCode) => {
    if (item?.pricesByCountry && countryCode && item.pricesByCountry[countryCode] != null) {
        return item.pricesByCountry[countryCode];
    }
    return item?.usdPrice ?? 0;
};

// Filter items by current country (countries[] include / excludedCountries[] exclude).
const filterByCountry = (items, countryCode) => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => {
        if (item.excludedCountries?.includes(countryCode)) return false;
        if (item.countries && !item.countries.includes(countryCode)) return false;
        return true;
    });
};

const GalleryPreview = ({ images = [], title = '' }) => {
    const [lightboxIdx, setLightboxIdx] = useState(null);
    const open = lightboxIdx !== null;

    const close = () => setLightboxIdx(null);
    const prev = (e) => {
        e?.stopPropagation?.();
        setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    const next = (e) => {
        e?.stopPropagation?.();
        setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length));
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, images.length]);

    if (!images.length) return null;

    return (
        <Box sx={{ mt: 1 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
                Gallery preview ({images.length})
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' },
                    gap: 1.5,
                    mt: 1.5,
                }}
            >
                {images.map((entry, i) => {
                    const thumbSrc = typeof entry === 'string' ? entry : entry.thumb;
                    return (
                        <Box
                            key={thumbSrc}
                            component="img"
                            loading="lazy"
                            src={thumbSrc}
                            alt={`${title} preview ${i + 1}`}
                            onClick={() => setLightboxIdx(i)}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                objectFit: 'cover',
                                borderRadius: 1,
                                cursor: 'pointer',
                                transition: 'transform .15s ease, box-shadow .15s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,.18)',
                                },
                            }}
                        />
                    );
                })}
            </Box>

            <Dialog
                open={open}
                onClose={close}
                maxWidth="lg"
                fullWidth
                PaperProps={{ sx: { bgcolor: 'rgba(0,0,0,.92)', boxShadow: 'none', borderRadius: 2 } }}
            >
                <DialogContent
                    onClick={close}
                    sx={{
                        p: 0,
                        position: 'relative',
                        minHeight: { xs: '60vh', md: '70vh' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'zoom-out',
                    }}
                >
                    <IconButton
                        onClick={(e) => { e.stopPropagation(); close(); }}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(0,0,0,.4)', '&:hover': { bgcolor: 'rgba(0,0,0,.65)' } }}
                        aria-label="Close gallery"
                    >
                        <CloseIcon />
                    </IconButton>
                    {images.length > 1 && (
                        <>
                            <IconButton
                                onClick={prev}
                                sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,.4)', '&:hover': { bgcolor: 'rgba(0,0,0,.65)' } }}
                                aria-label="Previous image"
                            >
                                <ChevronLeftIcon fontSize="large" />
                            </IconButton>
                            <IconButton
                                onClick={next}
                                sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'white', bgcolor: 'rgba(0,0,0,.4)', '&:hover': { bgcolor: 'rgba(0,0,0,.65)' } }}
                                aria-label="Next image"
                            >
                                <ChevronRightIcon fontSize="large" />
                            </IconButton>
                        </>
                    )}
                    {open && (
                        <Box
                            component="img"
                            src={typeof images[lightboxIdx] === 'string' ? images[lightboxIdx] : images[lightboxIdx].full}
                            alt={`${title} ${lightboxIdx + 1} of ${images.length}`}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: { xs: '70vh', md: '85vh' },
                                objectFit: 'contain',
                                display: 'block',
                                cursor: 'default',
                            }}
                        />
                    )}
                    {open && (
                        <Typography
                            variant="caption"
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                                bgcolor: 'rgba(0,0,0,.5)',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                            }}
                        >
                            {lightboxIdx + 1} / {images.length}
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

const BeachSessions = ({ forceCountry }) => {
    useDocumentTitle('Beach Sessions');
    useTakeMeToTheTop();
    const navigate = useNavigate();
    const { country, formatCurrency, countryCode, setCountry } = useCountry();
    const { addToCart, isInCart, getCartCount } = useBeachCart();

    // Promo entry (e.g. /rd/beach-sessions): pin the destination so prices,
    // availability and PayPal-only checkout all match. readInitialCode already
    // handles a fresh page load; this covers in-app (SPA) navigation.
    useEffect(() => {
        if (forceCountry && country?.code !== forceCountry) setCountry(forceCountry);
    }, [forceCountry, country?.code, setCountry]);

    const items = React.useMemo(() => filterByCountry(photoSessions, countryCode), [countryCode]);
    const isAvailableCountry = country?.code === 'DO';

    // Prices are now a starting estimate — the final price is confirmed with the
    // quote, so we show "starting at $X" instead of a fixed price + tax.
    const formatItemPrice = (usdPrice) => `starting at ${formatCurrency(usdPrice)}`;

    return (
        <Box
            component={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}
        >
            <Box sx={{ textAlign: 'center', py: { xs: 6, lg: 8 } }}>
                <BeachAccessIcon sx={{ fontSize: 56, color: 'primary.main', mb: 1 }} />
                <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="800"
                    sx={{
                        textTransform: 'uppercase',
                        fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                        letterSpacing: 2,
                    }}
                >
                    Beach Sessions
                </Typography>
                
            </Box>

            <Container maxWidth="lg" sx={{ pb: 10 }}>
                {!isAvailableCountry && (
                    <Alert severity="info" sx={{ mb: 4 }}>
                        Beach Sessions are currently available only in the Dominican Republic.
                        Switch destination from the header to browse them.
                    </Alert>
                )}

                {isAvailableCountry && items.length === 0 && (
                    <Alert severity="warning" sx={{ mb: 4 }}>
                        No beach sessions available right now. Please contact us at info@caribephoto.com.
                    </Alert>
                )}

                {isAvailableCountry && items.length > 0 && (
                    <Box sx={{ position: 'relative' }}>
                        {/* Floating cart button */}
                        {getCartCount() > 0 && (
                            <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1100 }}>
                                <IconButton
                                    onClick={() => navigate('/beach-sessions/cart')}
                                    size="large"
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        boxShadow: 6,
                                        '&:hover': { bgcolor: 'primary.dark' },
                                    }}
                                    aria-label="View beach cart"
                                >
                                    <Badge badgeContent={getCartCount()} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        )}

                        <Grid container spacing={4} justifyContent="center">
                            {items.map((item) => {
                                const effectivePrice = resolvePrice(item, countryCode);
                                return (
                                    <Grid size={12} key={item.id}>
                                        <Card
                                            component={motion.div}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.15 }}
                                            transition={{ duration: 0.5 }}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 4,
                                                overflow: 'hidden',
                                                width: '100%',
                                                maxWidth: 1120,
                                                mx: 'auto',
                                                boxShadow: '0 18px 48px -20px rgba(236, 72, 153, 0.30)',
                                            }}
                                        >
                                            {/* Full-width landscape banner — respects the wide photo's ratio */}
                                            <CardMedia
                                                component="img"
                                                image={item.img}
                                                alt={item.title}
                                                sx={{
                                                    width: '100%',
                                                    height: { xs: 240, sm: 340, md: 460 },
                                                    objectFit: 'cover',
                                                    objectPosition: 'center',
                                                }}
                                            />
                                            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                                                <Typography
                                                    variant="h3"
                                                    component="h3"
                                                    align="center"
                                                    gutterBottom
                                                    fontWeight="bold"
                                                    sx={{ fontSize: { xs: '1.6rem', md: '2.25rem' } }}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
                                                    Bavaro · Macao · Uvero Alto
                                                </Typography>

                                                {/* Details in two columns to use the full width */}
                                                <Grid container spacing={{ xs: 1, md: 5 }} sx={{ maxWidth: 900, mx: 'auto' }}>
                                                    <Grid size={{ xs: 12, md: item.additionalInfo?.length ? 6 : 12 }}>
                                                        <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: 'primary.main' }}>
                                                            Included with the service
                                                        </Typography>
                                                        <List dense>
                                                            {item.content.map((line, idx) => (
                                                                <ListItem key={idx} sx={{ py: 0.5 }} disableGutters>
                                                                    <CheckCircleIcon sx={{ fontSize: 18, mr: 1, color: 'primary.main' }} />
                                                                    <ListItemText primary={line} primaryTypographyProps={{ variant: 'body2' }} />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </Grid>

                                                    {item.additionalInfo?.length > 0 && (
                                                        <Grid size={{ xs: 12, md: 6 }}>
                                                            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary' }}>
                                                                Additional information
                                                            </Typography>
                                                            <List dense>
                                                                {item.additionalInfo.map((line, idx) => (
                                                                    <ListItem key={idx} sx={{ py: 0.25 }} disableGutters>
                                                                        <InfoIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                                        <ListItemText
                                                                            primary={line}
                                                                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                                                        />
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                    )}
                                                </Grid>

                                                {/* Pick-up times + contact */}
                                                <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3 }}>
                                                    <List dense>
                                                        <ListItem sx={{ py: 0.25 }} disableGutters>
                                                            <AccessTimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                            <ListItemText
                                                                primary="Pick-up times: 8:30 · 9:00 · 9:30 am — 4:00 · 4:30 · 5:00 pm"
                                                                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                                            />
                                                        </ListItem>
                                                        <ListItem sx={{ py: 0.25 }} disableGutters>
                                                            <InfoIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                            <ListItemText
                                                                primary={
                                                                    <>
                                                                        For questions or comments:{' '}
                                                                        <Link href="mailto:adminrd@caribephoto.com" underline="hover" sx={{ fontWeight: 600 }}>
                                                                            adminrd@caribephoto.com
                                                                        </Link>
                                                                    </>
                                                                }
                                                                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                                            />
                                                        </ListItem>
                                                    </List>
                                                </Box>

                                                <Stack alignItems="center" spacing={2} sx={{ mt: 4 }}>
                                                    <Typography variant="h4" color="primary" fontWeight="bold">
                                                        {formatItemPrice(effectivePrice)}
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        size="large"
                                                        startIcon={isInCart(item.id) ? <CheckCircleIcon /> : <ShoppingCartIcon />}
                                                        onClick={() => addToCart({ ...item, usdPrice: effectivePrice }, 'Photo Session')}
                                                        disabled={isInCart(item.id)}
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: 440,
                                                            background: isInCart(item.id)
                                                                ? 'grey.400'
                                                                : 'linear-gradient(to right, #ec4899, #db2777)',
                                                            '&:hover': {
                                                                background: 'linear-gradient(to right, #db2777, #be185d)',
                                                            },
                                                            '&:disabled': { color: 'white', opacity: 0.7 },
                                                        }}
                                                    >
                                                        {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                                                    </Button>
                                                </Stack>
                                            </CardContent>

                                            {/* Full-width gallery below */}
                                            {item.gallery?.length > 0 && (
                                                <Box sx={{ px: { xs: 3, md: 5 }, pb: { xs: 3, md: 5 } }}>
                                                    <GalleryPreview images={item.gallery} title={item.title} />
                                                </Box>
                                            )}
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default BeachSessions;
