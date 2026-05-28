import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCountry } from '../../context/CountryContext';

const CountrySwitcher = () => {
  const { country, availableCountries, requestCountryChange } = useCountry();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!country) return null;

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (code) => {
    handleClose();
    requestCountryChange(code);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        size="small"
        variant="outlined"
        color="inherit"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          textTransform: 'none',
          borderColor: 'divider',
          color: 'text.primary',
          px: 1.25,
          minWidth: 0,
        }}
        aria-label={`Change destination country, current: ${country.name}`}
      >
        <Box
          component="img"
          src={country.flagUrl}
          alt=""
          sx={{
            width: 22,
            height: 16,
            objectFit: 'cover',
            borderRadius: 0.5,
            mr: 0.75,
            display: 'block',
          }}
        />
        {!isMobile && (
          <Typography variant="body2" fontWeight={600}>
            {country.code}
          </Typography>
        )}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {availableCountries.map((c) => (
          <MenuItem key={c.code} selected={c.code === country.code} onClick={() => handleSelect(c.code)}>
            <Box
              component="img"
              src={c.flagUrl}
              alt=""
              sx={{
                width: 26,
                height: 18,
                objectFit: 'cover',
                borderRadius: 0.5,
                mr: 1.5,
                display: 'block',
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {c.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {c.currency}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CountrySwitcher;
