import { extendTheme } from '@chakra-ui/react';
import '@fontsource/lato';
import '@fontsource/merriweather';

// Define custom colors
const colors = {
  brand: {
    darkGreen: '#22543D', // Dark Green
    amber: '#E09132', // Amber
    white: '#FFFFFF', // White
  },
};

// Create the theme with custom colors and settings
const customTheme = extendTheme({
    colors,
    styles: {
        global: {
        'html, body': {
            bg: 'brand.white',
        },
        },
    },
    fonts: {
        heading: `'Lato', sans-serif`,
        body: `'Merriweather', sans-serif`,
    },
    components: {
        Input: {
            baseStyle: {
                focusBorderColor: 'brand.amber',
            },
        },
        Button: {
            baseStyle: {
                padding: '1px',
            },
            variants: {
                solid: {
                    bg: 'brand.darkGreen',
                    color: 'brand.white',
                    _hover: {
                        bg: 'brand.amber',
                    },
                },
            },
        },
    }
});

export default customTheme;
