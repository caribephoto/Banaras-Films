import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { COUNTRIES, getCountry, formatCurrency as fmtCurrency, convertFromUSD as conv } from '../i18n/countries';
import { useCart } from './CartContext';

const STORAGE_KEY = 'caribephoto_country';

const CountryContext = createContext(null);

export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error('useCountry must be used within a CountryProvider');
  return ctx;
};

// Detect a country hint from the entry URL so external promo links land on the
// right destination with no country-modal flash. Examples:
//   /rd/beach-sessions      → DO   (rd = República Dominicana)
//   /beach-sessions?country=DO → DO
const readCountryFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const { pathname, search } = window.location;
  if (/^\/(rd|do)(\/|$)/i.test(pathname)) return 'DO';
  const q = new URLSearchParams(search).get('country');
  if (q && getCountry(q.toUpperCase())) return q.toUpperCase();
  return null;
};

const readInitialCode = () => {
  // A URL hint wins so a promo link always opens in its intended country.
  const fromUrl = readCountryFromUrl();
  if (fromUrl) return fromUrl;
  const fromStorage = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (fromStorage && getCountry(fromStorage)) return fromStorage;
  const fromEnv = import.meta.env.VITE_DEFAULT_COUNTRY;
  if (fromEnv && getCountry(fromEnv)) return fromEnv;
  return null;
};

export const CountryProvider = ({ children }) => {
  const { cart, clearCartSilent } = useCart();
  const [countryCode, setCountryCode] = useState(readInitialCode);
  const [pendingChange, setPendingChange] = useState(null); // { newCode }

  const country = useMemo(() => getCountry(countryCode), [countryCode]);

  const persist = useCallback((code) => {
    setCountryCode(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore quota errors */
    }
  }, []);

  const setCountry = useCallback(
    (newCode) => {
      if (!getCountry(newCode)) return;
      persist(newCode);
    },
    [persist],
  );

  const requestCountryChange = useCallback(
    (newCode) => {
      if (!getCountry(newCode) || newCode === countryCode) return;
      if (cart && cart.length > 0) {
        setPendingChange({ newCode });
        return;
      }
      persist(newCode);
    },
    [cart, countryCode, persist],
  );

  const confirmPendingChange = useCallback(() => {
    if (!pendingChange) return;
    clearCartSilent?.();
    persist(pendingChange.newCode);
    setPendingChange(null);
  }, [pendingChange, clearCartSilent, persist]);

  const cancelPendingChange = useCallback(() => setPendingChange(null), []);

  const formatCurrency = useCallback(
    (usdAmount, options) => fmtCurrency(usdAmount, countryCode || 'MX', options),
    [countryCode],
  );

  const convertFromUSD = useCallback(
    (usdAmount) => conv(usdAmount, countryCode || 'MX'),
    [countryCode],
  );

  const value = useMemo(
    () => ({
      country,
      countryCode,
      availableCountries: COUNTRIES,
      setCountry,
      requestCountryChange,
      pendingChange,
      confirmPendingChange,
      cancelPendingChange,
      formatCurrency,
      convertFromUSD,
      taxRate: country?.taxRate ?? 0,
      taxLabel: country?.taxLabel ?? 'Tax',
      currency: country?.currency ?? 'USD',
      paymentProviders: country?.paymentProviders ?? { paypal: false, stripe: false },
      isReady: !!country,
    }),
    [
      country,
      countryCode,
      setCountry,
      requestCountryChange,
      pendingChange,
      confirmPendingChange,
      cancelPendingChange,
      formatCurrency,
      convertFromUSD,
    ],
  );

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
};
