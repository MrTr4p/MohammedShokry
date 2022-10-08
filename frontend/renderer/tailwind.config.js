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
			screens: {
				sm: "940px",
				// => @media (min-width: 640px) { ... }

				md: "1068px",
				// => @media (min-width: 768px) { ... }

				lg: "1224px",
				// => @media (min-width: 1024px) { ... }

				xl: "1480px",
				// => @media (min-width: 1280px) { ... }

				"2xl": "1536px",
				// => @media (min-width: 1536px) { ... }
			},
		},
		extend: {
			backgroundImage: {
				"bill-background": "url('/images/bill-background.png')",
			},
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
