/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // background color
        primary: '#0A0E12',
        //border color
        secondary: '#2B3138',
        //box bg
        boxbg:'#161B22',
        red:'#CB0000',
        green:"#006B31"

      }
    },
  },
  plugins: [ require('tailwind-scrollbar'),],
}