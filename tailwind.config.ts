import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "var(--ink-950)",
          800: "var(--ink-800)",
          600: "var(--ink-600)",
          400: "var(--ink-400)",
        },
        chalk: {
          50: "var(--chalk-50)",
          100: "var(--chalk-100)",
          200: "var(--chalk-200)",
        },
        paper: "var(--paper)",
        signal: {
          DEFAULT: "var(--signal)",
          hover: "var(--signal-hover)",
          subtle: "var(--signal-subtle)",
          fg: "var(--on-signal)",
        },
        arc: "var(--arc)",
        danger: "var(--danger)",
        success: "var(--signal)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Space Grotesk",
          "Segoe UI",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "Source Sans 3",
          "Segoe UI",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      maxWidth: {
        site: "1200px",
        prose: "680px",
      },
      boxShadow: {
        lift: "0 18px 50px rgba(7, 17, 31, 0.12)",
        soft: "0 8px 24px rgba(7, 17, 31, 0.06)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        ken: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s var(--ease-out) both",
        ken: "ken 18s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
