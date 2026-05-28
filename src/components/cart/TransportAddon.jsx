import React, { useEffect, useState, useMemo } from 'react';
import {
    Paper,
    Typography,
    Switch,
    FormControlLabel,
    Stack,
    Grid,
    TextField,
    MenuItem,
    Box,
    Alert,
    Chip,
    Divider,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useCountry } from '../../context/CountryContext';

const TRIP_TYPES = [
    { code: 'roundtrip', label: 'Round-trip (Airport ↔ Hotel)' },
    { code: 'oneway-arrival', label: 'One-way arrival (Airport → Hotel)' },
    { code: 'oneway-departure', label: 'One-way departure (Hotel → Airport)' },
];

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TransportAddon = ({ value, onChange, hotelAddress }) => {
    const { formatCurrency, currency, countryCode } = useCountry();
    const [enabled, setEnabled] = useState(!!value);
    const [options, setOptions] = useState([]);
    const [loadError, setLoadError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`${apiUrl}/api/transport/options?country=${countryCode || 'MX'}`);
                const json = await res.json();
                if (cancelled) return;
                if (json.success) {
                    setOptions(json.data || []);
                    setLoadError(null);
                } else {
                    setLoadError(json.message || 'Could not load transport options');
                }
            } catch (e) {
                if (!cancelled) setLoadError('Transportation service temporarily unavailable');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, [countryCode]);

    const selectedOption = useMemo(
        () => options.find((o) => o.code === value?.optionCode) || null,
        [options, value],
    );

    const handleToggle = (e) => {
        const isOn = e.target.checked;
        setEnabled(isOn);
        if (!isOn) {
            onChange?.(null);
        } else {
            onChange?.({
                optionCode: '',
                tripType: 'roundtrip',
                pickupDate: '',
                pickupTime: '',
                returnDate: '',
                returnTime: '',
                arrivalFlight: '',
                departureFlight: '',
                pax: 1,
                vehicleType: '',
                priceUSD: 0,
                hotelAddress,
            });
        }
    };

    const updateField = (field, fieldValue) => {
        const next = { ...(value || {}), [field]: fieldValue, hotelAddress };
        if (field === 'optionCode') {
            const opt = options.find((o) => o.code === fieldValue);
            next.vehicleType = opt?.vehicle_type || '';
            next.priceUSD = computePrice(opt, next.pax || 1);
        }
        if (field === 'pax') {
            const opt = options.find((o) => o.code === next.optionCode);
            next.priceUSD = computePrice(opt, fieldValue || 1);
        }
        onChange?.(next);
    };

    const computePrice = (option, pax) => {
        if (!option) return 0;
        const multiplier = option.pricing_model === 'per_pax' ? Math.max(parseInt(pax, 10) || 1, 1) : 1;
        return Number((option.base_price_usd * multiplier).toFixed(2));
    };

    const sortedOptions = useMemo(() => {
        if (!value?.tripType) return options;
        // Filter options whose code matches the trip type family (mx-roundtrip-* or mx-oneway-*)
        const wantsRoundtrip = value.tripType === 'roundtrip';
        return options.filter((o) =>
            wantsRoundtrip ? o.code.includes('roundtrip') : o.code.includes('oneway'),
        );
    }, [options, value?.tripType]);

    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <DirectionsCarIcon color="primary" />
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        Transportation (optional)
                    </Typography>
                    <Chip label="México only" size="small" color="primary" variant="outlined" />
                </Stack>
                <FormControlLabel
                    control={<Switch checked={enabled} onChange={handleToggle} />}
                    label={enabled ? 'Included' : 'Add transport'}
                    labelPlacement="start"
                />
            </Stack>

            {loadError && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {loadError}
                </Alert>
            )}

            {enabled && (
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Trip type"
                                value={value?.tripType || 'roundtrip'}
                                onChange={(e) => updateField('tripType', e.target.value)}
                            >
                                {TRIP_TYPES.map((t) => (
                                    <MenuItem key={t.code} value={t.code}>
                                        {t.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                disabled={loading || sortedOptions.length === 0}
                                label={loading ? 'Loading…' : 'Vehicle'}
                                value={value?.optionCode || ''}
                                onChange={(e) => updateField('optionCode', e.target.value)}
                                helperText={
                                    selectedOption?.base_price_usd === 0
                                        ? 'Pricing coming soon — booking disabled'
                                        : null
                                }
                            >
                                {sortedOptions.map((o) => (
                                    <MenuItem key={o.code} value={o.code}>
                                        {o.label} · up to {o.max_pax} pax
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Pickup date"
                                InputLabelProps={{ shrink: true }}
                                value={value?.pickupDate || ''}
                                onChange={(e) => updateField('pickupDate', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                type="time"
                                label="Pickup time"
                                InputLabelProps={{ shrink: true }}
                                value={value?.pickupTime || ''}
                                onChange={(e) => updateField('pickupTime', e.target.value)}
                            />
                        </Grid>
                        {value?.tripType === 'roundtrip' && (
                            <>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Return date"
                                        InputLabelProps={{ shrink: true }}
                                        value={value?.returnDate || ''}
                                        onChange={(e) => updateField('returnDate', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <TextField
                                        fullWidth
                                        type="time"
                                        label="Return time"
                                        InputLabelProps={{ shrink: true }}
                                        value={value?.returnTime || ''}
                                        onChange={(e) => updateField('returnTime', e.target.value)}
                                    />
                                </Grid>
                            </>
                        )}

                        {value?.tripType !== 'oneway-departure' && (
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Arrival flight #"
                                    placeholder="e.g. AA1234"
                                    value={value?.arrivalFlight || ''}
                                    onChange={(e) => updateField('arrivalFlight', e.target.value)}
                                />
                            </Grid>
                        )}
                        {value?.tripType !== 'oneway-arrival' && (
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Departure flight #"
                                    placeholder="e.g. AA4321"
                                    value={value?.departureFlight || ''}
                                    onChange={(e) => updateField('departureFlight', e.target.value)}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Passengers"
                                inputProps={{ min: 1, max: selectedOption?.max_pax || 12 }}
                                value={value?.pax || 1}
                                onChange={(e) => updateField('pax', parseInt(e.target.value, 10) || 1)}
                            />
                        </Grid>
                    </Grid>

                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Drop-off / pick-up at: <strong>{hotelAddress || 'Selected venue'}</strong>
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                            {selectedOption ? formatCurrency(value?.priceUSD || 0) : `${currency} —`}
                        </Typography>
                    </Box>
                </Stack>
            )}
        </Paper>
    );
};

export default TransportAddon;
