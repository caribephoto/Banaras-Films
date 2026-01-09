import React from "react";
import { useDocumentTitle } from "../../hooks/hooks";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../../utils/motions";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Error = () => {
  useDocumentTitle("Error 404");

  return (
    <Box
      component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <motion.div variants={textVariant(0.1)}>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="900"
            sx={{
              fontSize: { xs: '6rem', md: '10rem', lg: '12rem' },
              letterSpacing: 2,
              lineHeight: 1,
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div variants={textVariant(0.2)}>
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Oops! Page Not Found
          </Typography>
        </motion.div>

        <motion.div variants={textVariant(0.3)}>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 6, maxWidth: '600px', mx: 'auto', lineHeight: 1.8 }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
        </motion.div>

        <motion.div variants={textVariant(0.4)}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: '50px',
              px: 6,
              py: 2,
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 20px rgba(33, 150, 243, 0.3)'
            }}
          >
            Go Back Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Error;
