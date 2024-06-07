/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#0a1318",
        background: "#fbfdfd",
        primary: "#4190c1",
        secondary: "#8abede",
        accent: "#5ca9d8",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"],
  },
};
