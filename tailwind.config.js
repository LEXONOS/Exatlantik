/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-teal": "#0FB5AE",
        "brand-navy": "#1B2B40",
        "brand-amber": "#FFB800",
        "brand-cloud": "#F5F7FA",
        "brand-graphite": "#2F3A45",
      },
      boxShadow: {
        soft: "0 10px 24px rgba(0,0,0,0.05)",
      },
      maxWidth: { "8xl": "90rem" },
    },
  },
  plugins: [],
};

export default config;


