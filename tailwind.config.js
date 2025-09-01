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
    extend: {
      keyframes: {
        "float-y-1": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-y-2": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-x-1": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
        "float-x-2": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-8px)" },
        },
        "float-xy-1": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(12px, -16px)" },
          "50%": { transform: "translate(0px, -12px)" },
          "75%": { transform: "translate(-12px, -16px)" },
          "100%": { transform: "translate(0, 0)" },
          // "0%": { transform: "translate(0, 0)" },
          // "25%": { transform: "translate(5px, -10px)" },
          // "50%": { transform: "translate(0px, -5px)" },
          // "75%": { transform: "translate(-5px, -10px)" },
          // "100%": { transform: "translate(0, 0)" },
        },
        "float-xy-2": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(4px, -6px)" },
          "50%": { transform: "translate(0px, -3px)" },
          "75%": { transform: "translate(-4px, -6px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        "float-xy-3": {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-3px, 5px)" },
          "50%": { transform: "translate(3px, -5px)" },
          "75%": { transform: "translate(-2px, 2px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        "bounce-slow": "bounce 1.4s infinite",
        "float-y-1": "float-y-1 5s ease-in-out infinite",
        "float-y-2": "float-y-2 4s ease-in-out infinite",
        "float-x-1": "float-x-1 6s ease-in-out infinite",
        "float-x-2": "float-x-2 4s ease-in-out infinite",
        "float-xy-1": "float-xy-1 10s ease-in-out infinite",
        "float-xy-2": "float-xy-2 10s ease-in-out infinite",
        "float-xy-3": "float-xy-3 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
