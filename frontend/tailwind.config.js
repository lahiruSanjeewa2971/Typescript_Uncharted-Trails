/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			logo: [
  				'Yesteryear',
  				'cursive'
  			]
  		},
  		colors: {
  			textPrimary: '#1f2937',
  			background: '#0f172a',
			surface: '#1e293b',
  			primary: '#6366f1',
  			secondary: '#8b5cf6',
  			accent: '#334155',
  			textLight: '#f1f5f9',
  			mutetColor: '#94a3b8',
  			textHighlight: '#60a5fa'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}