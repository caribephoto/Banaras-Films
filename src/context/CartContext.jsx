import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('caribephoto_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('caribephoto_cart', JSON.stringify(cart));
  }, [cart]);

  const parsePrice = (priceString) => {
    // Extract numeric value from price string like "$4,287.87 + Tax"
    const match = priceString.match(/\$?([\d,]+\.?\d*)/);
    if (match) {
      return parseFloat(match[1].replace(/,/g, ''));
    }
    return 0;
  };

  const addToCart = (packageItem, category) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === packageItem.id
      );

      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        toast.success(`Increased quantity of ${packageItem.title}`, {
          position: 'top-right',
          autoClose: 2000,
        });
        return updatedCart;
      } else {
        // New item, add to cart
        toast.success(`${packageItem.title} added to cart!`, {
          position: 'top-right',
          autoClose: 2000,
        });
        return [
          ...prevCart,
          {
            ...packageItem,
            id: packageItem.id,
            category,
            quantity: 1,
            numericPrice: parsePrice(packageItem.price),
          },
        ];
      }
    });
  };

  const removeFromCart = (packageId) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === packageId);
      if (item) {
        toast.info(`${item.title} removed from cart`, {
          position: 'top-right',
          autoClose: 2000,
        });
      }
      return prevCart.filter((item) => item.id !== packageId);
    });
  };

  const updateQuantity = (packageId, quantity) => {
    if (quantity < 1) {
      removeFromCart(packageId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === packageId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared successfully', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.numericPrice * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (packageId) => {
    return cart.some((item) => item.id === packageId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
