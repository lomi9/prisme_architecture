/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F1F0EE",
        "shockingly-green": "#00FF00",
        "lt-green": "#32CD32",
        blue: "#0000FF",
        lilac: "#C8A2C8",
      },
    },
  },
  plugins: [],
};
