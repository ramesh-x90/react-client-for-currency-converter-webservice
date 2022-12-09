/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  darkMode : 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary : "#0a192f",
        secondery : "#64ffda",
        
      }
    },
  },
 
  plugins: [
    require('flowbite/plugin'),
  ],
}
