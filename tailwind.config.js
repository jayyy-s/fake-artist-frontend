/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fake-yellow": {
          light: "#fffa9e",
          DEFAULT: "#fffa9e",
          dark: "#b3ac2b",
        },
        "fake-pink": {
          light: "#ff98e6",
          DEFAULT: "#fb3199",
          dark: "#b0228e",
        },
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
          backgroundColor: "rgb(255 250 158 / var(--tw-bg-opacity))",
          "--tw-border-opacity": "1",
          borderColor: "rgb(0 0 0 / var(--tw-border-opacity))",
          borderRadius: "0.25rem",
          cursor: "pointer",
          "&:hover": {
            "--tw-bg-opacity": 1,
            backgroundColor: "rgb(179 172 43 / var(--tw-bg-opacity))",
          },
        },
      });
    }),
  ],
};
