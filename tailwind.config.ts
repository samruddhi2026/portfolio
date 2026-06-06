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
        primary: "#2563EB",
        secondary: "#7C3AED",
        accent: "#06B6D4",
        background: "#FFFFFF",
        foreground: "#0F172A",
        surface: "#F8FAFC",
        "surface-alt": "#F1F5F9",
        "surface-light": "#E2E8F0",
        border: "#E2E8F0",
        muted: "#64748B",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
        "shine":
          "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.8) 50%, transparent 75%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
      },
      boxShadow: {
        glow: "0 8px 32px rgba(37, 99, 235, 0.18)",
        "glow-purple": "0 8px 32px rgba(124, 58, 237, 0.18)",
        "glow-accent": "0 8px 32px rgba(6, 182, 212, 0.2)",
        card: "0 4px 24px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 12px 40px rgba(37, 99, 235, 0.15)",
        glass: "0 4px 24px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
