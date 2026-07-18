import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16A34A",
          hover: "#15803D",
          light: "#DCFCE7",
        },
        success: "#22C55E",
        info: "#2563EB",
        reward: "#FACC15",
        challenge: "#FB923C",
        premium: "#7C3AED",
        error: "#EF4444",
        background: "#FFFFFF",
        "background-secondary": "#F8FAFC",
        card: "#FFFFFF",
        border: "#E5E7EB",
        text: {
          DEFAULT: "#111827",
          secondary: "#6B7280",
        },
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        btn: "12px",
        card: "18px",
        input: "12px",
        dialog: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        md: "0 2px 8px 0 rgb(0 0 0 / 0.06)",
      },
      backgroundImage: {
        "progress-gradient": "linear-gradient(90deg, #16A34A 0%, #34D399 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
