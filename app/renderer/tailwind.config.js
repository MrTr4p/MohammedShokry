const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: "",
      secondary: "",
      base: "#FFFFFF"
    },
    extend: {},
  },
  plugins: [],
};
