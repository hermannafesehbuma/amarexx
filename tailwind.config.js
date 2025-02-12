/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#26273d',
        secondary: '#fcb819',
        accent: '#f06b52',
        dark: '#2d3748',
        light: '#ffff',
        white: '#ffffff',
      },
      fontWeight: {
        bold: '700',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        xs: '344px',
        cxs: '499px',
        lg: '1025px',
      },
      animation: {
        blink: 'blink 1s infinite',
        spin: 'spin 1s linear infinite', // 🔥 Explicitly define the spin animation
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
