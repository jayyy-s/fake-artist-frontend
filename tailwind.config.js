/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fake-yellow": {
          light: "#fffa9e",
          DEFAULT: "#ffeb3d",
          dark: "#ffd83d",
        },
        "fake-pink": {
          light: "#ff98e6",
          DEFAULT: "#fb3199",
          dark: "#b0228e",
        },
        "fake-purple": "#5C164E",
        "fake-white": "#F8F4F9",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": {transform: "translateY(0px)", opacity: "1"  },
        },
      },
      animation: {
        slideIn: "ease 400ms 1 slideIn",
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".btn-fake-yellow": {
          "border-width": "1px",
          "--tw-text-opacity": "1",
          color: "rgb(51 65 85 / var(--tw-text-opacity))",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "--tw-bg-opacity": "1",
          backgroundColor: "rgb(255 235 61 / var(--tw-bg-opacity))",
          "--tw-border-opacity": "1",
          borderColor: "rgb(0 0 0 / var(--tw-border-opacity))",
          borderRadius: "0.25rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            "--tw-bg-opacity": "1",
            backgroundColor: "rgb(255 216 61 / var(--tw-bg-opacity))",
          },
        },
      });
    }),
  ],
};
