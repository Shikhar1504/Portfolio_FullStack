// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // make Poppins default
        poppins: ["Poppins", "sans-serif"], // optional alias
        roboto: ["Roboto", "sans-serif"], // if using roboto too
      },
    },
  },

  plugins: [],
};
