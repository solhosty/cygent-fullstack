import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff6e8",
        ink: "#162033",
        coral: "#ff7b72",
        teal: "#2bb3b1",
        mustard: "#ffc857"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(120deg, #fff6e8 0%, #ffe8d6 45%, #d4f6f2 100%)"
      },
      boxShadow: {
        card: "0 14px 40px rgba(22, 32, 51, 0.12)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        appear: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        floaty: "floaty 3s ease-in-out infinite",
        appear: "appear 0.45s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
