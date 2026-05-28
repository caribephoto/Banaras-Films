import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'caribephoto_beach_cart';

const BeachCartContext = createContext();

export const useBeachCart = () => {
    const ctx = useContext(BeachCartContext);
    if (!ctx) throw new Error('useBeachCart must be used inside <BeachCartProvider>');
    return ctx;
};

export const BeachCartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch { /* quota ignore */ }
    }, [cart]);

    const addToCart = (item, category) => {
        setCart((prev) => {
            const idx = prev.findIndex((i) => i.id === item.id);
            if (idx > -1) {
                const next = [...prev];
                next[idx].quantity += 1;
                toast.success(`Increased quantity of ${item.title}`, { position: 'top-right', autoClose: 2000 });
                return next;
            }
            toast.success(`${item.title} added to cart!`, { position: 'top-right', autoClose: 2000 });
            return [
                ...prev,
                {
                    ...item,
                    category: category || item.category || 'Beach Session',
                    quantity: 1,
                    numericPrice: item.usdPrice || 0,
                },
            ];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => {
            const found = prev.find((i) => i.id === id);
            if (found) toast.info(`${found.title} removed from cart`, { position: 'top-right', autoClose: 2000 });
            return prev.filter((i) => i.id !== id);
        });
    };

    const updateQuantity = (id, qty) => {
        if (qty < 1) return removeFromCart(id);
        setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    };

    const clearCart = () => {
        setCart([]);
        toast.success('Cart cleared', { position: 'top-right', autoClose: 2000 });
    };

    const clearCartSilent = () => setCart([]);

    const getCartTotal = () => cart.reduce((sum, i) => sum + (i.numericPrice || 0) * (i.quantity || 1), 0);
    const getCartCount = () => cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    const isInCart = (id) => cart.some((i) => i.id === id);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearCartSilent,
        getCartTotal,
        getCartCount,
        isInCart,
    };

    return <BeachCartContext.Provider value={value}>{children}</BeachCartContext.Provider>;
};
