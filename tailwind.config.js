/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  // Daisy UI theme configuration
  daisyui: {
    themes: ['light'],
    base: false,
    styled: true,
    utils: true,
    logs: true,
    themeRoot: ':root'
  }
};
