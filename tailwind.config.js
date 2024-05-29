/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				'background': '#e3eaef',
				'header': '#17192d',
				'border':'#d8dfe6',
				'button-company': '#023b78',
				'button-company-active': '#2188ff',
				'title': '#24292f',
				'secondary': '#77818c'
			}
		},
	},
	plugins: [],
}

