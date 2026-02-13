import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        inkSoft: "#0A0A0C",
        accent: "#0050FF",
        accentCyan: "#00D6FF"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "SF Pro Text", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 80, 255, 0.25)",
        soft: "0 10px 40px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
