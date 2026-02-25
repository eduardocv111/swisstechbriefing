/**
 * Premium Dark Editorial Color Palette
 */
export const Colors = {
    dark: {
        background: '#0a0a0a',   // OLED Black
        card: '#171717',         // Dark gray card
        text: '#ffffff',         // White
        textMuted: '#a3a3a3',    // Muted gray
        primary: '#e11d48',      // Rose 600
        border: '#262626',       // Subtle border
        error: '#ef4444',
    },
    light: {
        background: '#fdfdfd',
        card: '#ffffff',
        text: '#0a0a0a',
        textMuted: '#525252',
        primary: '#e11d48',
        border: '#e5e5e5',
        error: '#dc2626',
    }
};

export type ThemeType = 'dark' | 'light';
