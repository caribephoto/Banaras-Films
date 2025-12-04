import { createTheme } from '@mui/material/styles';

// Tailwind pink-500 is #ec4899
const primaryColor = '#ec4899';

const getTheme = (mode) => createTheme({
    palette: {
        mode,
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: '#f472b6', // pink-400
        },
        background: {
            default: mode === 'dark' ? '#0b1121' : '#dbdde0ff',
            paper: mode === 'dark' ? '#1f2937' : '#ffffff',
        },
        text: {
            primary: mode === 'dark' ? '#ffffff' : '#1f2937', // gray-600
            secondary: mode === 'dark' ? '#9ca3af' : '#4b5563', // gray-400/500
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem', // rounded-lg
                },
            },
        },
    },
});

export default getTheme;
