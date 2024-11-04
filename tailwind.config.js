import { nextui } from "@nextui-org/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-mono)"],
			},
		},
		backgroundImage: {
			"about-us":
				"url('https://cdn.pixabay.com/photo/2023/03/19/08/09/network-7862066_1280.jpg')",
			nutrition:
				"url('https://cdn.pixabay.com/photo/2023/12/08/05/41/cat-8436848_960_720.jpg')",
			contact:
				"url('https://cdn.pixabay.com/photo/2019/09/25/09/36/team-4503157_960_720.jpg')",
			"discount-1": "url(https://i.ibb.co/Br96pXJ/icon2.png)",
			"discount-2": "url(https://i.ibb.co/t8vKZx6/icon1.png)",
			"discount-3": "url(https://i.ibb.co/4PmLPpT/background-spot-oval.png)",
		},
	},
	darkMode: "class",
	plugins: [nextui()],
}
