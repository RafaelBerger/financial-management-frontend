/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Poppins, sans-serif",
      },
      colors: {
        pers: {
          100: "#3A445D",
          200: "#283142",
        },
      },
    },
  },
  plugins: [],
};
