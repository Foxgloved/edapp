import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        light: {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#fafafa',
          300: '#f7f7f7',
          400: '#f5f5f5',
          500: '#f0f0f0',
          600: '#e8e8e8',
          700: '#e0e0e0',
          800: '#d4d4d4',
          900: '#c4c4c4',
        },
      },
    },
  },
  plugins: [],
};
export default config;
