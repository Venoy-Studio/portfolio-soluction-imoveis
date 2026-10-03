/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(211, 82%, 25%)',
          hover: 'hsl(211, 82%, 20%)',
          foreground: 'hsl(210, 40%, 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(211, 65%, 35%)',
          foreground: 'hsl(210, 40%, 98%)',
        },
        accent: {
          DEFAULT: 'hsl(40, 90%, 61%)',
          hover: 'hsl(40, 90%, 55%)',
          foreground: 'hsl(213, 50%, 11%)',
        },
        background: 'hsl(210, 33%, 98%)',
        foreground: 'hsl(213, 50%, 11%)',
        card: {
          DEFAULT: '#ffffff',
          foreground: 'hsl(213, 50%, 11%)',
        },
        muted: {
          DEFAULT: 'hsl(210, 25%, 95%)',
          foreground: 'hsl(213, 20%, 45%)',
        },
        border: 'hsl(210, 20% 90%)',
        input: 'hsl(210, 20% 90%)',
        gold: 'hsl(40, 90%, 61%)',
        whatsapp: '#25D366',
        'whatsapp-hover': '#20ba59',
        'footer-bg': '#071b2d',
        'footer-text': '#94a3b8',
        'footer-title': '#ffffff',
        'footer-divider': '#1e3852',
        'footer-link': '#cbd5e1',
        'footer-cta': '#092540',
      },
      fontFamily: {
        heading: ['Roboto', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px -4px hsla(213, 50%, 11%, 0.08)',
        'card-hover': '0 20px 50px -12px hsla(213, 50%, 11%, 0.18)',
        'float': '0 10px 30px -5px rgba(12, 63, 116, 0.25)',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
