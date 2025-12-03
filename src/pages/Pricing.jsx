import React from "react";
import { useDocumentTitle, useTakeMeToTheTop } from "../hooks/hooks";
import { staggerContainer, theOpacity } from "../utils/motions";
import { motion } from "framer-motion";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

const Pricing = () => {
  useDocumentTitle("Pricing");
  useTakeMeToTheTop();

  const plans = [
    {
      name: "Basic",
      price: "₹22,000",
      gradient: "linear-gradient(135deg, #FDE047 0%, #DC2626 100%)",
      features: [
        { name: "Drone Footage of Venue", included: false },
        { name: "Crane Shot Visuals", included: false },
        { name: "Live Telecast at Night Functions", included: false },
        { name: "LED Wall", included: false },
        { name: "Guaranteed Delivery within 3 week", included: true },
        { name: "15 Sec. Social Media Clip", included: true },
        { name: "1 Minute Teaser", included: false },
        { name: "7 to 9 Min. Highlight Film", included: false },
        { name: "Traditional Feature Film", included: true },
        { name: "Wedding Film USB", included: true },
        { name: "Photo Album", included: true },
        { name: "Unlimited Wedding Day Locations", included: true },
        { name: "Industry Leading Film Coloring", included: true }
      ]
    },
    {
      name: "Standard",
      price: "₹35,000",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
      features: [
        { name: "Drone Footage of Venue", included: true },
        { name: "Crane Shot Visuals", included: false },
        { name: "Live Telecast at Night Functions", included: false },
        { name: "LED Wall", included: false },
        { name: "Guaranteed Delivery within 2 week", included: true },
        { name: "15 Sec. Social Media Clip", included: true },
        { name: "1 Minute Teaser", included: true },
        { name: "7 to 9 Min. Highlight Film", included: true },
        { name: "Traditional Feature Film", included: true },
        { name: "Wedding Film USB", included: true },
        { name: "Photo Album", included: true },
        { name: "Unlimited Wedding Day Locations", included: true },
        { name: "Industry Leading Film Coloring", included: true }
      ]
    },
    {
      name: "Premium",
      price: "₹50,000",
      gradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
      features: [
        { name: "Drone Footage of Venue", included: true },
        { name: "Crane Shot Visuals", included: true },
        { name: "Live Telecast at Night Functions", included: true },
        { name: "LED Wall", included: true },
        { name: "Guaranteed Delivery within 1 week", included: true },
        { name: "15 Sec. Social Media Clip", included: true },
        { name: "1 Minute Teaser", included: true },
        { name: "7 to 9 Min. Highlight Film", included: true },
        { name: "Traditional Feature Film", included: true },
        { name: "Wedding Film USB", included: true },
        { name: "Photo Album", included: true },
        { name: "Unlimited Wedding Day Locations", included: true },
        { name: "Industry Leading Film Coloring", included: true }
      ]
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
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
          Pricing Plans
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            Check the below plans and choose yourself.
          </Typography>
          <Stack direction="column" spacing={1} alignItems="center" sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon color="success" />
              <Typography variant="body2">: INCLUDED in the plan</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CancelIcon color="error" />
              <Typography variant="body2">: NOT INCLUDED in the plan</Typography>
            </Stack>
          </Stack>
        </Box>

        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {plans.map((plan, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={plan.name}
              component={motion.div}
              variants={theOpacity(0.2 * (index + 1), 1)}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box
                  sx={{
                    background: plan.gradient,
                    p: 3,
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    fontWeight="800"
                    sx={{
                      textTransform: 'uppercase',
                      color: 'white',
                      letterSpacing: 2,
                      fontSize: { xs: '2rem', lg: '2.5rem' }
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'white', mt: 1, fontWeight: 'bold' }}>
                    {plan.price}
                  </Typography>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <FeaturedPlayListIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">Features</Typography>
                  </Stack>

                  <Stack spacing={1.5}>
                    {plan.features.map((feature, idx) => (
                      <Stack
                        key={idx}
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                      >
                        {feature.included ? (
                          <CheckCircleIcon color="success" sx={{ mt: 0.3, fontSize: 20 }} />
                        ) : (
                          <CancelIcon color="error" sx={{ mt: 0.3, fontSize: 20 }} />
                        )}
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {feature.name}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            All prices are subject to change. Contact us for current pricing and availability.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;
