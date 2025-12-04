import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartIcon = () => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <Link to="/cart" style={{ textDecoration: 'none' }}>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Badge
                    badgeContent={cartCount}
                    color="primary"
                    max={9}
                    sx={{
                        '& .MuiBadge-badge': {
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                        }
                    }}
                >
                    <IconButton
                        sx={{
                            border: 1,
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            '&:hover': {
                                bgcolor: 'action.hover',
                            }
                        }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </Badge>
            </motion.div>
        </Link>
    );
};

export default CartIcon;
