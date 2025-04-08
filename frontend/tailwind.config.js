/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Yesteryear', 'cursive']
      },
      colors: {
        textPrimary: '#1f2937',

        background: '#0f172a', //main background
        primary: '#6366f1', //buttons
        secondary: '#8b5cf6', // hover
        accent: '#334155', //headers, cards, footer
        textLight: '#f1f5f9', // light text
        mutetColor: '#94a3b8', // subtext, descriptions
        textHighlight: '#60a5fa' //tags, links
      }
    },
  },
  plugins: [],
}