import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import { useDocumentTitle, useTakeMeToTheTop } from './hooks/hooks';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Checkout = () => {
    useDocumentTitle('Checkout');
    useTakeMeToTheTop();

    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [orderComplete, setOrderComplete] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);

    const TAX_RATE = parseFloat(process.env.REACT_APP_TAX_RATE || 0.16);
    const subtotal = getCartTotal();
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MXN',
        }).format(amount);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return customerInfo.name && customerInfo.email && customerInfo.phone;
    };

    // PayPal configuration
    const initialOptions = {
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'test',
        currency: process.env.REACT_APP_CURRENCY || 'MXN',
        intent: 'capture',
    };

    const createOrder = (data, actions) => {
        if (!isFormValid()) {
            toast.error('Please complete all customer information.');
            return Promise.reject();
        }

        const currency = process.env.REACT_APP_CURRENCY || 'MXN';

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: currency,
                                value: subtotal.toFixed(2),
                            },
                            tax_total: {
                                currency_code: currency,
                                value: tax.toFixed(2),
                            },
                        },
                    },
                    description: `CaribPhoto Order - ${cart.length} package(s)`,
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            setOrderDetails(details);
            setOrderTotal(total); // Save the total before clearing cart
            setOrderComplete(true);
            clearCart();
            toast.success('Payment successful! Thank you for your order.');
        });
    };

    const onError = (err) => {
        console.error('PayPal Error:', err);
        toast.error('Payment failed. Please try again.');
    };

    if (cart.length === 0 && !orderComplete) {
        navigate('/cart');
        return null;
    }

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0b1121] text-gray-600 dark:text-white font-[Poppins]">
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center"
                    >
                        <div className="text-6xl mb-4">✅</div>
                        <h1 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
                            Order Confirmed!
                        </h1>
                        <p className="text-xl mb-6">
                            Thank you for your purchase, {customerInfo.name}!
                        </p>
                        <div className="bg-white dark:bg-gray-900 rounded-md p-6 mb-6 text-left">
                            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                            <p className="mb-2">
                                <strong>Order ID:</strong> {orderDetails?.id}
                            </p>
                            <p className="mb-2">
                                <strong>Email:</strong> {customerInfo.email}
                            </p>
                            <p className="mb-2">
                                <strong>Phone:</strong> {customerInfo.phone}
                            </p>
                            <p className="mb-2">
                                <strong>Total Paid:</strong>{' '}
                                <span className="text-pink-500 font-bold">
                                    {formatCurrency(orderTotal)}
                                </span>
                            </p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            A confirmation email has been sent to {customerInfo.email}
                        </p>
                        <button
                            onClick={() => navigate('/services')}
                            className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
                        >
                            Continue Shopping
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1121] text-gray-600 dark:text-white font-[Poppins]">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Customer Information */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={customerInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    {/* Order Summary & Payment */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-3 mb-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between text-sm border-b border-gray-300 dark:border-gray-600 pb-2"
                                    >
                                        <span>
                                            {item.title} x {item.quantity}
                                        </span>
                                        <span className="font-semibold">
                                            {formatCurrency(item.numericPrice * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2 pt-4 border-t border-gray-300 dark:border-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span className="font-semibold">
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>VAT ({(TAX_RATE * 100).toFixed(0)}%):</span>
                                    <span className="font-semibold">{formatCurrency(tax)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                                    <span>Total:</span>
                                    <span className="text-pink-500">{formatCurrency(total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* PayPal Payment */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6">Payment</h2>
                            {!isFormValid() && (
                                <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">
                                    Please complete all customer information before proceeding with payment.
                                </div>
                            )}
                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                    style={{ layout: 'vertical' }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                    disabled={!isFormValid()}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
