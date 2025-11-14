/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00ff9c",
        neonSoft: "#00ff9c22",
        darkBg: "#0a0f1f",
        panel: "#111827aa",
        borderGlow: "#00ff9c55",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        neon: "0 0 20px #00ff9c88",
        neonSoft: "0 0 10px #00ff9c55",
      },
      animation: {
        pulseGlow: "pulseGlow 3s infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px #00ff9c55" },
          "50%": { boxShadow: "0 0 20px #00ff9caa" }
        }
      }
    },
  },
  plugins: [],
};
