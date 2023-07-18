/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export const content = ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
	extend: {
		backgroundColor: "#1f2937"
	},
	colors: {
		transparent: "transparent",
		current: "currentColor"
	},
	screens: {
		sm: "480px",
		md: "768px",
		lg: "976px",
		xl: "1440px"
	}
};
export const plugins = [];
