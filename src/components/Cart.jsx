import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useDocumentTitle, useTakeMeToTheTop } from './hooks/hooks';
import { motion } from 'framer-motion';
import { BsTrash, BsPlus, BsDash } from 'react-icons/bs';

const Cart = () => {
    useDocumentTitle('Carrito de Compras');
    useTakeMeToTheTop();

    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

    const TAX_RATE = parseFloat(process.env.REACT_APP_TAX_RATE || 0.16);
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
            <div className="min-h-screen bg-white dark:bg-[#0b1121] text-gray-600 dark:text-white font-[Poppins]">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                        Cart
                    </h1>
                    <div className="flex flex-col items-center justify-center py-16">
                        <BsTrash className="text-6xl text-gray-400 mb-4" />
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
                            Your cart is empty
                        </p>
                        <Link
                            to="/services"
                            className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
                        >
                            See Packages
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1121] text-gray-600 dark:text-white font-[Poppins]">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
                    Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full md:w-32 h-32 object-cover rounded-md"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        Category: {item.category}
                                    </p>
                                    <p className="text-lg font-semibold text-pink-500">
                                        {item.price}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <BsTrash className="text-xl" />
                                    </button>
                                    <div className="flex items-center gap-2 mt-4">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <BsDash />
                                        </button>
                                        <span className="px-4 py-1 bg-white dark:bg-gray-900 rounded-md font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <BsPlus />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Subtotal:
                                    </span>
                                    <span className="font-semibold">
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        IVA ({(TAX_RATE * 100).toFixed(0)}%):
                                    </span>
                                    <span className="font-semibold">{formatCurrency(tax)}</span>
                                </div>
                                <hr className="border-gray-300 dark:border-gray-600" />
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span className="text-pink-500">{formatCurrency(total)}</span>
                                </div>
                            </div>
                            <Link
                                to="/checkout"
                                className="w-full block text-center px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200 font-semibold"
                            >
                                Proceed to Payment
                            </Link>
                            <Link
                                to="/services"
                                className="w-full block text-center px-6 py-3 mt-3 border border-pink-500 text-pink-500 rounded-md hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
