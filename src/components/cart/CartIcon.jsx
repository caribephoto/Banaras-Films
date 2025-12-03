import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const CartIcon = () => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <Link to="/cart" className="relative">
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center text-2xl lg:text-2xl p-2 lg:p-3 rounded-full border border-indigo-300 bg-gray-200 dark:bg-gray-800 cursor-pointer"
            >
                <BsCart3 />
                {cartCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    >
                        {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                )}
            </motion.div>
        </Link>
    );
};

export default CartIcon;
