/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(11rem, 1fr))",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};