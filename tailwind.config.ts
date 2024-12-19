import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
  				'100': '#EA6365',
  				DEFAULT: '#1CC2E3'
  			},
        dark: {
  				'100': '#04050C',
  				'200': '#131524'
  			},
      },
    },
  },
  plugins: [],
} satisfies Config;
