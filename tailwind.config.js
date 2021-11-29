module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 1)), url('/header.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
