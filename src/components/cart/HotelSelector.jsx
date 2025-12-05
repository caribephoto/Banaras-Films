import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Chip,
    Stack,
    Radio,
    Grid,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    People as PeopleIcon,
    Star as StarIcon,
} from '@mui/icons-material';

const HotelCard = ({ hotel, selected, onSelect }) => {
    return (
        <Card
            onClick={() => onSelect(hotel.id)}
            sx={{
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                border: selected ? '3px solid' : '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                transform: selected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: selected ? 6 : 1,
                '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.01)',
                },
            }}
        >
            {/* Radio Button */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 1,
                    bgcolor: 'background.paper',
                    borderRadius: '50%',
                    boxShadow: 2,
                }}
            >
                <Radio
                    checked={selected}
                    sx={{
                        color: 'white',
                        '&.Mui-checked': {
                            color: 'primary.main',
                        },
                    }}
                />
            </Box>

            {/* Hotel Image */}
            <CardMedia
                component="img"
                height="200"
                image={hotel.image}
                alt={hotel.name}
                sx={{
                    objectFit: 'cover',
                }}
            />

            <CardContent>
                {/* Hotel Name */}
                <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {hotel.name}
                </Typography>

                {/* Location */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
                    <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                        {hotel.location}
                    </Typography>
                </Box>

                {/* Rating */}
                {hotel.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2" fontWeight="600">
                            {hotel.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            / 5.0
                        </Typography>
                    </Box>
                )}

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: 40,
                    }}
                >
                    {hotel.description}
                </Typography>

                {/* Capacity */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 0.5 }}>
                    <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                        Up to {hotel.capacity}
                    </Typography>
                </Box>

                {/* Features */}
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {hotel.features.slice(0, 3).map((feature, index) => (
                        <Chip
                            key={index}
                            label={feature}
                            size="small"
                            sx={{
                                fontSize: '0.7rem',
                                height: 24,
                                bgcolor: selected ? 'primary.light' : 'action.hover',
                                color: selected ? 'primary.contrastText' : 'text.secondary',
                            }}
                        />
                    ))}
                    {hotel.features.length > 3 && (
                        <Chip
                            label={`+${hotel.features.length - 3}`}
                            size="small"
                            sx={{
                                fontSize: '0.7rem',
                                height: 24,
                                bgcolor: 'action.hover',
                                color: 'text.secondary',
                            }}
                        />
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

const HotelSelector = ({ selectedHotel, onHotelSelect, hotels, error }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                Select Your Wedding Venue
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Choose the hotel or venue where your wedding will take place
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Grid container spacing={2}>
                {hotels.map((hotel) => (
                    <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                        <HotelCard
                            hotel={hotel}
                            selected={selectedHotel === hotel.id}
                            onSelect={onHotelSelect}
                        />
                    </Grid>
                ))}
            </Grid>

            {selectedHotel === 'other' && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Please provide your venue details in the notes or contact us directly.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HotelSelector;
