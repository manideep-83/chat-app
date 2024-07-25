/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        '7D7C7C': '#747171',
        '3F3D3D':'#2A2929',
        '5D5B5B':'#5D5B5B',
        '555454':'#555454',
        '878787': '#878787',
        'dddedd':'#dddedd',
        '383636': '#383636',
      },
      boxShadow: {
        customWhite: 'rgba(255, 255, 255, 0.5) 0px 4px 6px -1px, rgba(255, 255, 255, 0.3) 0px 2px 4px -1px',
        custom: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      }
    },
  },
  plugins: [],
}

