import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				primary: "#2596BE",
				secondary: "#00AB55",
				tertiary: "#A9A9B2",
				warning: "#D4BF08",
				danger: "#B72136",
				textColor: "#212B36",
				backgroundColor: "#D5D3E0",
			},
		},
	},
	plugins: [],
};

export default config;
