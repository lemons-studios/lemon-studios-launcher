/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export const content = ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
	extend: {
		backgroundColor: "#1f2937"
	},
	colors: {
		"transparent": "transparent",
		"current": "currentColor",
		"accent-light": "#0067c0",
		"accent-light-hover": "#1975c5",
		"accent-light-active": "#3183ca",
		"accent-dark": "#4cc2ff",
		"accent-dark-hover": "#47b1e8",
		"accent-dark-active": "#42a1d2"
	},
	screens: {
		sm: "480px",
		md: "768px",
		lg: "976px",
		xl: "1440px"
	}
};
export const plugins = [];
