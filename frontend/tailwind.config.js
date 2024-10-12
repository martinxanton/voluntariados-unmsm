import { light } from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {  
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["fantasy"],
        primary: "#0075bf",
        secondary: "#6d0076",
      },
      dark: {
        ...require("daisyui/src/theming/themes")["night"],
        primary: "#0075bf",
        secondary: "#6d0076",
      },
    }],
  },
};
