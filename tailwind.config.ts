import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b1220",
          900: "#111827",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
        },
        sage: {
          50: "#f0fdf6",
          100: "#dcfce8",
          400: "#4ade80",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
        },
        clay: {
          50: "#faf6f1",
          100: "#f3ebe0",
          400: "#d4a574",
          500: "#b45309",
        },
        sand: "#f7f4ef",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
