/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header': "url('/img/header-bg-min.png')",
        'header-news': "url('/img/header-news.png')",
        'letsassesment': "url('/img/letsassesment-min.png')",
        "wave" : "url('/img/wave.png')",
      },
      height: {
        '100': '35rem',
        '128': '40rem',
        '140': '50rem',
      },
      width: {
        '100': '35rem',
        '128': '40rem',
        '140': '60rem',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      colors: {
        'primary': '#006632',
        'primary-light': '#53C38A',
        'secondary': '#EDF2F5',
      }
    },
  },
  plugins: [],
}
