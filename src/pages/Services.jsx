import React from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import { staggerContainer } from "../utils/motions";
import { motion } from "framer-motion";
import { packagesVip } from "../utils/vip-package";
import { pkg } from "../utils/package";
import { Link } from "react-router-dom";
import { morePkg } from "../utils/morePackage";
import { useCart } from "../context/CartContext";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Services = () => {
  useDocumentTitle("Services");
  useTakeMeToTheTop();
  const { addToCart, isInCart } = useCart();

  const PackageCard = ({ item, category }) => (
    <Card
      component={motion.div}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(236, 72, 153, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 100 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={item.img}
        alt={item.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Typography variant="h5" component="h3" align="center" gutterBottom fontWeight="bold">
          {item.title}
        </Typography>
        <List dense sx={{ flexGrow: 1, mb: 2 }}>
          {item.content.map((contentItem, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <CheckCircleIcon sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
              <ListItemText
                primary={contentItem}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
        <Typography
          variant="h6"
          align="center"
          color="primary"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {item.price}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            fullWidth
            startIcon={isInCart(item.id) ? <CheckCircleIcon /> : <ShoppingCartIcon />}
            onClick={() => addToCart(item, category)}
            disabled={isInCart(item.id)}
            sx={{
              background: isInCart(item.id)
                ? 'grey.400'
                : 'linear-gradient(to right, #ec4899, #db2777)',
              '&:hover': {
                background: isInCart(item.id)
                  ? 'grey.400'
                  : 'linear-gradient(to right, #db2777, #be185d)',
              },
              '&:disabled': {
                color: 'white',
                opacity: 0.7
              }
            }}
          >
            {isInCart(item.id) ? "In Cart" : "Add to Cart"}
          </Button>
          <IconButton
            component={Link}
            to="/terms"
            color="primary"
            sx={{
              border: 1,
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
            title="Read more"
          >
            <InfoIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box
      component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      sx={{ bgcolor: 'background.default', color: 'text.primary', overflow: 'hidden' }}
    >
      {/* Page Title */}
      <Box sx={{ textAlign: 'center', py: { xs: 6, lg: 8 } }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="800"
          sx={{
            textTransform: 'uppercase',
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
            letterSpacing: 2
          }}
        >
          Our Services
        </Typography>
      </Box>

      <Container maxWidth="lg">
        {/* VIP Packages */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              VIP Packages
            </Typography>
            <Divider
              sx={{
                width: 48,
                height: 4,
                bgcolor: 'primary.main',
                mx: 'auto',
                mt: 2,
                borderRadius: 2
              }}
            />
          </Box>
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} justifyContent="center">
            {packagesVip.map((vip, idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={idx}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Grid item xs={12} md={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%', maxWidth: 350 }}>
                    <PackageCard item={vip} category="VIP Package" />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Regular Packages */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Packages
            </Typography>
            <Divider
              sx={{
                width: 48,
                height: 4,
                bgcolor: 'primary.main',
                mx: 'auto',
                mt: 2,
                borderRadius: 2
              }}
            />
          </Box>
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} justifyContent="center">
            {pkg.map((packages, idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={idx}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Grid item xs={12} md={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%', maxWidth: 350 }}>
                    <PackageCard item={packages} category="Package" />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* More Packages */}
        <Box sx={{ mb: 8, pb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              More Packages
            </Typography>
            <Divider
              sx={{
                width: 48,
                height: 4,
                bgcolor: 'primary.main',
                mx: 'auto',
                mt: 2,
                borderRadius: 2
              }}
            />
          </Box>
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} justifyContent="center">
            {morePkg.map((morepkg, idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={idx}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Grid item xs={12} md={4} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ width: '100%', maxWidth: 350 }}>
                    <PackageCard item={morepkg} category="Additional Service" />
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
