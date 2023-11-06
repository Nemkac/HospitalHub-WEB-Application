/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      inter: ["Inter", "sans-serif"],
    },
    colors:{
      primary: "#E5D8C4",
      secondary: "#176148",
      third: "#F5F6FA",
      textLightGreen: "#6AB49B"
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

