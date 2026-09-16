import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 primarily uses CSS-first configuration via @theme in globals.css.
 * This file is kept for content paths and any residual tooling compatibility.
 */
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
