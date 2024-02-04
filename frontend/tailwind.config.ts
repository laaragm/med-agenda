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
				backgroundColor: "#FAFAF8", // #F5F5F7, #FAFAF8
				borderColor: "#212B36",
			},
			zIndex: {
				"100": "100",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
				  	to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
				  	from: { height: "var(--radix-accordion-content-height)" },
				  	to: { height: "0" },
				},
				"bounce-in-right": {
					"0%": {
					  opacity: "0",
					  transform: "translateX(2000px)"
					},
					"60%": {
					  opacity: "1",
					  transform: "translateX(-30px)"
					},
					"80%": {
					  transform: "translateX(10px)"
					},
					"100%": {
					  transform: "translateX(0)"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"bounce-in-right": "bounce-in-right 1s ease-out"
			},
		},
	},
	plugins: [],
};

export default config;
