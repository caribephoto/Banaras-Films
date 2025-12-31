/**
 * Cart validation utilities for business rules
 * - Drone package requires video package
 * - Drone package not available for Jamaica
 */

/**
 * Check if cart contains any video package
 * @param {Array} cart - Shopping cart items
 * @returns {boolean}
 */
export const hasVideoPackage = (cart) => {
    if (!cart || cart.length === 0) return false;

    return cart.some(item => {
        // Check if it's a video addon
        if (item.isVideoPackage) return true;

        // Check by ID
        if (item.id === 'video-addon' || item.id === 'video-extra-addon') return true;

        // Check if it's a VIP package (they include video coverage)
        if (item.category === 'vip' || item.id?.includes('vip')) return true;

        // Check title as fallback
        const title = item.title?.toLowerCase() || '';
        return title.includes('video') && !title.includes('drone');
    });
};

/**
 * Check if cart contains drone package
 * @param {Array} cart - Shopping cart items
 * @returns {boolean}
 */
export const hasDronePackage = (cart) => {
    if (!cart || cart.length === 0) return false;

    return cart.some(item =>
        item.id === 'drone-addon' ||
        item.requiresVideo === true ||
        item.title?.toLowerCase() === 'drone'
    );
};

/**
 * Validate if drone can be added to cart
 * @param {Array} cart - Current cart items
 * @returns {Object} { canAdd: boolean, reason: string }
 */
export const canAddDrone = (cart) => {
    if (hasVideoPackage(cart)) {
        return { canAdd: true, reason: '' };
    }

    return {
        canAdd: false,
        reason: 'Drone package requires a video package. Please add Video or Extra Video Hour first.'
    };
};

/**
 * Get list of hotels excluded for current cart
 * @param {Array} cart - Shopping cart items
 * @returns {Array} Array of excluded hotel IDs
 */
export const getExcludedHotelsForCart = (cart) => {
    if (!hasDronePackage(cart)) return [];

    // Drone excludes Jamaica hotel
    return ['azul-negril'];
};

/**
 * Check if a hotel is allowed for current cart
 * @param {Array} cart - Shopping cart items
 * @param {string} hotelId - Hotel ID to check
 * @returns {Object} { allowed: boolean, reason: string }
 */
export const isHotelAllowed = (cart, hotelId) => {
    const excludedHotels = getExcludedHotelsForCart(cart);

    if (excludedHotels.includes(hotelId)) {
        return {
            allowed: false,
            reason: 'This venue is not available with the Drone package due to local regulations.'
        };
    }

    return { allowed: true, reason: '' };
};

/**
 * Validate cart for checkout
 * @param {Array} cart - Shopping cart items
 * @param {string} hotelId - Selected hotel ID
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateCartForCheckout = (cart, hotelId) => {
    const errors = [];

    // Check if drone in cart
    if (hasDronePackage(cart)) {
        // Validate has video
        if (!hasVideoPackage(cart)) {
            errors.push('Drone package requires a video package in your cart.');
        }

        // Validate hotel
        const hotelCheck = isHotelAllowed(cart, hotelId);
        if (!hotelCheck.allowed) {
            errors.push(`Cannot proceed: ${hotelCheck.reason}`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

/**
 * Get available hotels for cart (filters out excluded ones)
 * @param {Array} allHotels - All available hotels
 * @param {Array} cart - Shopping cart items
 * @returns {Array} Filtered hotels
 */
export const getAvailableHotels = (allHotels, cart) => {
    const excludedHotelIds = getExcludedHotelsForCart(cart);

    if (excludedHotelIds.length === 0) return allHotels;

    return allHotels.filter(hotel => !excludedHotelIds.includes(hotel.id));
};
