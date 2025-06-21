/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scanLine: "scanY 2s ease-in-out infinite alternate",
      },
      keyframes: {
        scanY: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(6000%)" },
        },
      },
    },
  },
  plugins: [],
};
