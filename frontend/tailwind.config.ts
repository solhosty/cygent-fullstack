import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"]
      },
      colors: {
        background: "#0a0a0f",
        foreground: "#f5f7ff",
        card: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.1)",
        surface: {
          1: "rgba(255, 255, 255, 0.04)",
          2: "rgba(255, 255, 255, 0.08)",
          3: "rgba(255, 255, 255, 0.12)"
        },
        muted: {
          DEFAULT: "rgba(226, 232, 240, 0.75)",
          foreground: "rgba(226, 232, 240, 0.52)"
        },
        primary: "#7c3aed",
        primarySoft: "#a855f7",
        accent: "#3b82f6",
        glow: "#a855f7",
        success: "#34d399",
        danger: "#fb7185"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      backgroundImage: {
        "gradient-border": "linear-gradient(135deg, rgba(168,85,247,0.9), rgba(59,130,246,0.9))",
        "hero-glow": "radial-gradient(circle at top, rgba(124,58,237,0.28), transparent 55%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(168,85,247,0.35)" },
          "50%": { boxShadow: "0 0 0 12px rgba(168,85,247,0)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        glowBreath: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        "slow-spin": "slowSpin 24s linear infinite",
        "glow-breath": "glowBreath 4s ease-in-out infinite"
      }
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config;
