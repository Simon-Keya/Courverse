import type { Config } from "tailwindcss";

// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // Add this line if you have a pages directory
  ],
  theme: {
    extend: {},
  },
  plugins: [

  ],
} satisfies Config;
