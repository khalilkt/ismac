/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#E95A02",
        secondary: "#3259E8",
        gray: "#cfcfcf",
        lightGray: "#e1e1e1",
        textGray: "#848484",
        error: "#AA0000",
      },
    },
  },
  plugins: [],
};
