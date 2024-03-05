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
        "player-brown": "#964910",
        "player-red": "#ff2f18",
        "player-orange": "#ff822a",
        "player-yellow": "#fbdd38",
        "player-light-green": "#7ccf9f",
        "player-dark-green": "#0d6f64",
        "player-cyan": "#00bbf2",
        "player-blue": "#0458b0",
        "player-indigo": "#394ba7",
        "player-purple": "#bd58ab",
        "player-pink": "#fa3198",
        "player-gray": "#42454b",
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
          "&:hover": {
            "--tw-bg-opacity": "1",
            backgroundColor: "rgb(255 216 61 / var(--tw-bg-opacity))",
          },
        },
      });
    }),
  ],
};
