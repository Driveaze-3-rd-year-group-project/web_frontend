/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        deepblue: '#01103B',
        lightblue: '#A5BECC',
        driveazered: '#e80f17'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}