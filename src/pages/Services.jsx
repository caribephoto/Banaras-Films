import React, { useMemo } from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import { staggerContainer } from "../utils/motions";
import { motion } from "framer-motion";
import { packagesVip } from "../utils/vip-package";
import { pkg } from "../utils/package";
import { morePkg } from "../utils/morePackage";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCountry } from "../context/CountryContext";
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
  Stack,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Resolve effective USD price for an item, given the active country.
// Falls back to `usdPrice` when no override is defined.
const resolvePrice = (item, countryCode) => {
  if (item?.pricesByCountry && countryCode && item.pricesByCountry[countryCode] != null) {
    return item.pricesByCountry[countryCode];
  }
  return item?.usdPrice ?? 0;
};

// Drop items that opt out of the current country (e.g. Piña Package is hidden for DO).
const filterByCountry = (items, countryCode) => {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    if (item.excludedCountries?.includes(countryCode)) return false;
    if (item.countries && !item.countries.includes(countryCode)) return false;
    return true;
  });
};

const Services = () => {
  useDocumentTitle("Services");
  useTakeMeToTheTop();
  const { addToCart, isInCart } = useCart();
  const { formatCurrency, taxRate, taxLabel, countryCode } = useCountry();

  const vipForCountry = useMemo(() => filterByCountry(packagesVip, countryCode), [countryCode]);
  const pkgForCountry = useMemo(() => filterByCountry(pkg, countryCode), [countryCode]);
  const moreForCountry = useMemo(() => filterByCountry(morePkg, countryCode), [countryCode]);

  const PackageCard = ({ item, category }) => {
    const effectivePrice = resolvePrice(item, countryCode);
    return (
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
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {formatCurrency(effectivePrice)}
            </Typography>
            {taxRate > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                + {formatCurrency(effectivePrice * taxRate)} {taxLabel} ({(taxRate * 100).toFixed(0)}%) · Total {formatCurrency(effectivePrice * (1 + taxRate))}
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              fullWidth
              startIcon={isInCart(item.id) ? <CheckCircleIcon /> : <ShoppingCartIcon />}
              onClick={() => addToCart({ ...item, usdPrice: effectivePrice }, category)}
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
  };

  const renderDestinationWeddings = () => (
    <>
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
        {vipForCountry.length > 0 ? (
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} justifyContent="center">
            {vipForCountry.map((vip, idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={vip.id ?? idx}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '100%', maxWidth: 350 }}>
                  <PackageCard item={vip} category="VIP Package" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ fontStyle: 'italic', my: 4 }}>
            No VIP packages available at this moment.
          </Typography>
        )}
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
        {pkgForCountry.length > 0 ? (
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} justifyContent="center">
            {pkgForCountry.map((packages, idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={packages.id ?? idx}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '100%', maxWidth: 350 }}>
                  <PackageCard item={packages} category="Package" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ fontStyle: 'italic', my: 4 }}>
            No packages available at this moment.
          </Typography>
        )}
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
        {moreForCountry.length > 0 ? (
          <Grid container spacing={{ xs: 3, md: 4, lg: 5 }} justifyContent="center">
            {moreForCountry.map((morepkg, idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={morepkg.id ?? idx}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ width: '100%', maxWidth: 350 }}>
                  <PackageCard item={morepkg} category="Additional Service" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ fontStyle: 'italic', my: 4 }}>
            No additional packages available at this moment.
          </Typography>
        )}
      </Box>
    </>
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
        {renderDestinationWeddings()}
      </Container>
    </Box>
  );
};

export default Services;
