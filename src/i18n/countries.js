const TAX_RATE_MX = parseFloat(import.meta.env.VITE_TAX_RATE_MX ?? '0.16');
const TAX_RATE_JM = parseFloat(import.meta.env.VITE_TAX_RATE_JM ?? '0');
const TAX_RATE_DO = parseFloat(import.meta.env.VITE_TAX_RATE_DO ?? '0');

const flag = (envVar, def = 'false') => (import.meta.env[envVar] ?? def) === 'true';

// Windows native emoji font does NOT include national flag emojis,
// so we use flagcdn.com SVGs for cross-platform rendering.
const flagUrl = (code) => `https://flagcdn.com/${code.toLowerCase()}.svg`;

export const COUNTRIES = [
  {
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    flagUrl: flagUrl('MX'),
    currency: 'USD',
    defaultLocale: 'en-US',
    taxRate: TAX_RATE_MX,
    taxLabel: 'IVA',
    paymentProviders: {
      paypal: flag('VITE_ENABLE_PAYPAL_MX', 'true'),
      stripe: flag('VITE_ENABLE_STRIPE_MX', 'false'),
    },
  },
  {
    code: 'JM',
    name: 'Jamaica',
    flag: '🇯🇲',
    flagUrl: flagUrl('JM'),
    currency: 'USD',
    defaultLocale: 'en-US',
    taxRate: TAX_RATE_JM,
    taxLabel: 'Tax',
    paymentProviders: {
      paypal: flag('VITE_ENABLE_PAYPAL_JM', 'true'),
      stripe: flag('VITE_ENABLE_STRIPE_JM', 'false'),
    },
  },
  {
    code: 'DO',
    name: 'República Dominicana',
    flag: '🇩🇴',
    flagUrl: flagUrl('DO'),
    currency: 'USD',
    defaultLocale: 'en-US',
    taxRate: TAX_RATE_DO,
    taxLabel: 'Tax',
    paymentProviders: {
      paypal: flag('VITE_ENABLE_PAYPAL_DO', 'true'),
      stripe: flag('VITE_ENABLE_STRIPE_DO', 'false'),
    },
  },
];

export const getCountry = (code) => COUNTRIES.find((c) => c.code === code) || null;

// Placeholder: today all countries are USD so this is identity.
// When local currencies (MXN, JMD, DOP) are introduced, multiply by the rate per country here.
export const convertFromUSD = (usdAmount, countryCode) => {
  const country = getCountry(countryCode);
  if (!country) return usdAmount || 0;
  return usdAmount || 0;
};

export const formatCurrency = (usdAmount, countryCode, options = {}) => {
  const country = getCountry(countryCode);
  const currency = country?.currency || 'USD';
  const locale = country?.defaultLocale || 'en-US';
  const amount = convertFromUSD(usdAmount, countryCode);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
  }).format(amount);
};
