import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  Card,
  CardActionArea,
  Typography,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCountry } from '../../context/CountryContext';

// Map ISO country code → marketing destination label shown in the modal.
const DESTINATION_LABEL = {
  MX: 'Mexico',
  DO: 'Punta Cana',
  JM: 'Jamaica',
};

const CountryModal = () => {
  const { country, availableCountries, setCountry, pendingChange } = useCountry();
  const open = !country && !pendingChange;

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: { xs: 1, md: 2 } } }}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return;
      }}
    >
      <DialogContent sx={{ pt: { xs: 3, md: 4 } }}>
        <Typography
          align="center"
          sx={{
            color: 'text.primary',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.6,
            maxWidth: 720,
            mx: 'auto',
            mb: 3,
          }}
        >
          With over two decades of experience capturing families, couples, and destination weddings
          across Mexico, Jamaica, and Punta Cana, our portfolio represents a wealth of tropical expertise.
        </Typography>
        <Typography
          align="center"
          sx={{
            fontWeight: 700,
            letterSpacing: 4,
            color: 'primary.main',
            fontSize: { xs: '0.85rem', md: '1rem' },
            mb: 1,
          }}
        >
          MEXICO &nbsp;·&nbsp; PUNTA CANA &nbsp;·&nbsp; JAMAICA
        </Typography>
      </DialogContent>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: { xs: '1.4rem', md: '1.75rem' }, pt: 0 }}>
        Select your destination
      </DialogTitle>
      <DialogContent>
        <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
          Choose your destination for your wedding or service. You can change it later from the header.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {availableCountries.map((c) => (
            <Card
              key={c.code}
              component={motion.div}
              whileHover={{ scale: 1.04, boxShadow: '0px 10px 30px rgba(236, 72, 153, 0.3)' }}
              transition={{ type: 'spring', stiffness: 200 }}
              sx={{
                width: 220,
                height: 260,
                flexShrink: 0,
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
              }}
            >
              <CardActionArea
                onClick={() => setCountry(c.code)}
                sx={{
                  p: 3,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Stack alignItems="center" spacing={2} sx={{ width: '100%' }}>
                  <Box
                    component="img"
                    src={c.flagUrl}
                    alt={`${c.name} flag`}
                    loading="lazy"
                    sx={{
                      width: 80,
                      height: 56,
                      objectFit: 'cover',
                      borderRadius: 1,
                      boxShadow: '0 2px 6px rgba(0,0,0,.15)',
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    align="center"
                    sx={{
                      minHeight: '3.2em',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1.2,
                      px: 1,
                    }}
                  >
                    {DESTINATION_LABEL[c.code] || c.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Prices in {c.currency}
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
