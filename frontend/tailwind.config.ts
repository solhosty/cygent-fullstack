import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#f5f7ff",
        card: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.1)",
        primary: "#7c3aed",
        accent: "#3b82f6",
        glow: "#a855f7"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(168,85,247,0.35)" },
          "50%": { boxShadow: "0 0 0 12px rgba(168,85,247,0)" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite"
      }
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config;
