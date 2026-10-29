import type { Config } from "tailwindcss";

// Design tokens live as CSS variables in app/globals.css; Tailwind only
// maps names onto them so there is one source of truth for every color.
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
        italic: ["var(--font-italic)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        raspberry: "rgb(var(--raspberry) / <alpha-value>)",
        "raspberry-deep": "rgb(var(--raspberry-deep) / <alpha-value>)",
        lime: "rgb(var(--lime) / <alpha-value>)",
        mauve: "rgb(var(--mauve) / <alpha-value>)",
        "mauve-light": "rgb(var(--mauve-light) / <alpha-value>)",
        rose: "rgb(var(--rose) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        rule: "rgb(var(--rule))",
      },
      maxWidth: {
        page: "1240px",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
