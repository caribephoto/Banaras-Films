/**
 * Validate a transport payload before checkout submit.
 * Returns { valid:boolean, errors:Object }
 */
export const validateTransport = (transport) => {
    const errors = {};
    if (!transport) return { valid: true, errors };

    if (!transport.optionCode) errors.option = 'Choose a transport option';
    if (!transport.tripType) errors.tripType = 'Choose trip type';
    if (!transport.pickupDate) errors.pickupDate = 'Pickup date is required';
    if (!transport.pickupTime) errors.pickupTime = 'Pickup time is required';
    if (transport.tripType === 'roundtrip') {
        if (!transport.returnDate) errors.returnDate = 'Return date is required for round-trip';
        if (!transport.returnTime) errors.returnTime = 'Return time is required for round-trip';
    }
    if (transport.tripType !== 'oneway-departure' && !transport.arrivalFlight) {
        errors.arrivalFlight = 'Arrival flight is required';
    }
    if (transport.tripType !== 'oneway-arrival' && transport.tripType && !transport.departureFlight) {
        errors.departureFlight = 'Departure flight is required';
    }
    if (!transport.pax || transport.pax < 1) errors.pax = 'Passengers must be at least 1';

    return { valid: Object.keys(errors).length === 0, errors };
};
