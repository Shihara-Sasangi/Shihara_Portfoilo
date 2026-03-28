/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        background: "#020817",
        foreground: "#f9fafb",
        muted: {
          DEFAULT: "#020617",
          foreground: "#6b7280",
        },
        primary: {
          DEFAULT: "#79C72C",
          foreground: "#f9fafb",
        },
        secondary: {
          DEFAULT: "#0f172a",
          foreground: "#e5e7eb",
        },
        accent: {
          DEFAULT: "#4c9141",
          foreground: "#022c22",
        },
        border: "#1f2937",
      },
      boxShadow: {
        "soft-xl":
          "0 20px 45px rgba(15,23,42,0.75), 0 0 0 1px rgba(148,163,184,0.15)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

