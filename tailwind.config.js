/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bubble: {
          "0%": { transform: "translateY(0)", opacity: "0.8" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translateY(-200px)", opacity: "0" },
        },
      },
      animation: {
        bubble: "bubble 6s infinite ease-in-out",
      },
      variants: {
        // ...
        // -     tableLayout: ['responsive'],
        tableLayout: ["responsive", "hover", "focus"],
      },
      colors: {
        "blue-700": "#0369a1", // Sidebar background
        "blue-600": "#0284c7", // Hover effects
        "aqua-500": "#00d4ff", // Aqua font color
        primary: "#4CAF50", // Example color for buttons and highlights
        secondary: "#f5f5f5", // Background shade
      },
      fontFamily: {
        aqua: ["'Quicksand'", "sans-serif"], // Example font, customize as needed
      },
      spacing: {
        3: "0.75rem",
        4: "1rem",
      },
      animation: {
        spin: "spin 1.5s linear infinite",
        "bubble-rise": "bubble-rise 2s infinite",
      },
      keyframes: {
        "bubble-rise": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
