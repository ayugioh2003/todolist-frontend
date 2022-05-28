module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 15px 0px #00000026;'
      }
    },
    colors: {
      primary: '#FFD370',
      secondary: '#333',
      placeholder: '#9F9A91',
      white: '#fff',
      error: '#D87355',
      border: '#efefef',
      checked: '#e5e5e5'
    }
  },
  plugins: [],
}