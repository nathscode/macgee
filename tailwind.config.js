/** @type {import('tailwindcss').Config} */

const { join } = require("path");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],

	theme: {
		extend: {
			fontFamily: {
				Poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				brand: "#FF0026",
				grey: "#d4e3e3",
			},
		},
	},
};
