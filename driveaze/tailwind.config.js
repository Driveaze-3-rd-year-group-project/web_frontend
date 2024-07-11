/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  plugins: [],
}