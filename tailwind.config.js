/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        sm: '14px',
        base: '16px',
        md: '18px',
        xl: '24px',
        lg: '32px',
      },
      spacing: {
        'xs': '6px',
        'sm': '12px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '12px',
        'md': '24px',
        'lg': '48px',
        'full': '50%',
      },
      colors: {
        'primary': '#04295a',
        'secondary': '#473dff',
        'blue': '#bfe2fd',
        'border': '#d6d9e6',
        'text': '#9699ab',
        'text2': '#adbeff',
        'lightBg': '#eff5ff',
      },
    },
  },
  plugins: [],
}

