const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./renderer/pages/**/*.{js,ts,jsx,tsx}",
		"./renderer/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		extend: {
			fontFamily: {
				cairo: ["Cairo", "sans-serif"],
			},
			colors: {
				primary: "#55516C",
				"primary-hover": "#777389",
				"primary-active": "#65627A",
				"primary-focus": "#65627A",
				secondary: "#ECECEC",
				"secondary-hover": "#F3F3F3",
				"secondary-active": "#FAFAFA",
				"secondary-focus": "#FAFAFA",
				base: "#FFFFFF",
			},
		},
	},
};
