/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    // fontFamily: {
    //   sans: ['Inter', 'sans-serif'],
    // },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
