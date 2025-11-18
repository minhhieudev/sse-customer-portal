const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#1f2050",
          purple: "#5146ff",
          lavender: "#f3f1ff",
          blush: "#ffd7f2",
          sky: "#eef6ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 30px 80px rgba(81, 70, 255, 0.12)",
      },
    },
  },
  plugins: [nextui()],
};
