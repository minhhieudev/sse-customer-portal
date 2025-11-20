/* eslint-env node */
/* eslint-disable no-undef */
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#004B9A", // ~50%
          orange: "#F4A300", // ~25%
          white: "#FFFFFF", // ~20%
          green: "#47B649", // ~5%
          ink: "#1f2050",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 30px 80px rgba(81, 70, 255, 0.12)",
      },
      letterSpacing: {
        normal: '0',
      }
    },
  },
  plugins: [nextui()],
};