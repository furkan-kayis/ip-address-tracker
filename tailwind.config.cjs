

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
    fontFamily:{
      'sans':['Rubik', 'sans-serif']
    },
    colors:{
      'very-dark-gray':'#2b2b2b',
      'dark-gray':'#969696'
    }
    },
  },
  plugins: [],
}
