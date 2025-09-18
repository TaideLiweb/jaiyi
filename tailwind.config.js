/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js}", "*.{html,js}"],
  theme: {
    screens: {
      md: "768px",
      lg: "1000px",
    },
    container: {
      screens: {
        md: "768px",
        lg: "1000px",
      },
    },
    extend: {},
  },
  plugins: [],
}
