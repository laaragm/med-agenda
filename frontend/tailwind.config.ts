import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', "./*.html"],
	theme: {
		extend: {
			colors: {
				primary: "#2596BE",
				secondary: "#00AB55",
				tertiary: "#A9A9B2",
				warning: "#D4BF08",
				danger: "#B72136",
				textPrimary: "#212B36",
				backgroundColor: "#F5F5F7", // #F1F0F5, #F8F8FF, #F5F5F7, #FAFAF8, #E8F0FA
				borderColor: "#212B36",
			},
		},
	},
	plugins: [],
};

export default config;
