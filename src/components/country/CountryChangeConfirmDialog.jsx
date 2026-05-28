import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { useCountry } from '../../context/CountryContext';
import { getCountry } from '../../i18n/countries';

const CountryChangeConfirmDialog = () => {
  const { pendingChange, confirmPendingChange, cancelPendingChange, country } = useCountry();
  const target = pendingChange ? getCountry(pendingChange.newCode) : null;

  return (
    <Dialog open={!!pendingChange} onClose={cancelPendingChange} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight="bold">Change destination?</DialogTitle>
      <DialogContent>
        <Typography component="div">
          Switching from{' '}
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', fontWeight: 'bold', mx: 0.5 }}>
            <Box component="img" src={country?.flagUrl} alt="" sx={{ width: 22, height: 16, objectFit: 'cover', borderRadius: 0.5, mr: 0.5 }} />
            {country?.name}
          </Box>{' '}
          to{' '}
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', fontWeight: 'bold', mx: 0.5 }}>
            <Box component="img" src={target?.flagUrl} alt="" sx={{ width: 22, height: 16, objectFit: 'cover', borderRadius: 0.5, mr: 0.5 }} />
            {target?.name}
          </Box>{' '}
          will empty your cart, since hotels and add-ons differ between destinations.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={cancelPendingChange} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={confirmPendingChange}
          sx={{
            textTransform: 'none',
            background: 'linear-gradient(to right, #ec4899, #db2777)',
            '&:hover': { background: 'linear-gradient(to right, #db2777, #be185d)' },
          }}
        >
          Yes, change country
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CountryChangeConfirmDialog;
