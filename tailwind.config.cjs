/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#294F83',
        primaryLight: '#A9B9CD',
        secondary: '#16ABE5',
        grey: '#999999',
        purple: '#6359E9',
        green: '#02B15A',
        yellow: '#F4C728',
        red: '#EA4335',
      },
    },
  },
  plugins: [],
};
