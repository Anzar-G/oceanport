/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mysterious Navy Theme Colors
        'navy-base': '#0A1628',
        'navy-mid': '#1B2B44', 
        'navy-light': '#2D4263',
        'cyan-glow': '#00D9FF',
        'teal-accent': '#1DD3B0',
        'purple-depth': '#7B68EE',
        'gray-cool': '#B8C5D6',
        'shadow-navy': '#050B14',
        'glass': 'rgba(29, 43, 68, 0.6)',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
      },
      borderRadius: {
        'input': '12px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 255, 0.15)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2), 0 16px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2), 0 16px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 217, 255, 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}