/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        ink: "var(--color-ink)",
        accent: "var(--color-accent)",
        accentSoft: "var(--color-accent-soft)"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(95, 167, 141, 0.35), 0 20px 60px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};
