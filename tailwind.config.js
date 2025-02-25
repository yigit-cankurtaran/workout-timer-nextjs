/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // hail mary lol
  ],
  darkMode: "media", // or 'class' for manual dark mode toggle
  theme: {
    extend: {
      colors: {
        apple: {
          blue: {
            DEFAULT: "#0071e3",
            dark: "#0077ed",
          },
          gray: {
            light: "#f5f5f7",
            medium: "#86868b",
            dark: "#1d1d1f",
          },
          ui: {
            light: "#ffffff",
            dark: "#1c1c1e",
          },
          border: {
            light: "#d2d2d7",
            dark: "#38383a",
          },
          success: "#34c759",
          warning: "#ff9500",
          error: "#ff3b30",
        },
      },
      boxShadow: {
        "apple-sm": "0 2px 6px rgba(0, 0, 0, 0.05)",
        apple: "0 4px 12px rgba(0, 0, 0, 0.08)",
        "apple-lg": "0 12px 24px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        apple: "12px",
      },
    },
  },
  plugins: [],
};
