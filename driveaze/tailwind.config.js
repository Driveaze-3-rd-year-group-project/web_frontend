/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 15s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      colors: {
        deepblue: '#01103B',
        lightblue: '#A5BECC',
        driveazered: '#e80f17'
      },
      height: {
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '130': '32.5rem',
        '140': '35rem',
        '150': '37.5rem',
        '160': '40rem',
        '170': '42.5rem',
        '180': '45rem',
        '190': '47.5rem',
        '200': '50rem',
      },
      width: {
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '130': '32.5rem',
        '140': '35rem',
        '150': '37.5rem',
        '160': '40rem',
        '170': '42.5rem',
        '180': '45rem',
        '190': '47.5rem',
        '200': '50rem',
      },
    },
  },
  plugins: [
  ],
}