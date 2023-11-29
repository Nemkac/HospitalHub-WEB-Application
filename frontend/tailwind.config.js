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
      primary: "#DCDDE1",
      secondary: "#0582cb",
      third: "#003554",
      lightBlue: "#00A6FB",
      white:"#F5F6FA",
      yellow:"#fbc531",
      red: "#c23616",
      purple: "#8c7ae6",
      darkGreen: "#037971",
      gray: "#7f8fa6"
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

