/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("daisyui"),
  ],
  daisyui: {  
    themes: [{
      fantasy: {
        ...require("daisyui/src/theming/themes")["fantasy"],
        primary: "#0075bf",
        secondary: "#6d0076",
      },
    },"light", "dark", "cupcake", "dim", "winter", "fantasy", "luxury", "forest", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "black", "bumblebee", "halloween", "garden", "forest", "dracula", "night"],
  },
};
