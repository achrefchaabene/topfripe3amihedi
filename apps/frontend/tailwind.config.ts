import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#132019",
        moss: "#3e5d49",
        clay: "#a66f4f",
        cream: "#f7f2e8",
        linen: "#fbfaf6"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(19, 32, 25, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
