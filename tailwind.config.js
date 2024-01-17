/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        "Kanit": ["Kanit", "sans-serif"],
        "Noto Sans Thai": ["Noto Sans Thai", "sans-serif"]
      },
      screens: {
        desktop: "768px",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],

}

