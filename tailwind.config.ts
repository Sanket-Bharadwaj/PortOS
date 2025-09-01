import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'roboto-flex': ['Roboto Flex', 'system-ui', 'sans-serif'],
			},
			colors: {
				// PortOS Core Colors
				desktop: 'hsl(var(--desktop-bg))',
				glass: 'hsl(var(--glass-bg))',
				
				// Material Design 3 System
				md3: {
					primary: 'hsl(var(--md3-primary))',
					'primary-container': 'hsl(var(--md3-primary-container))',
					'on-primary': 'hsl(var(--md3-on-primary))',
					'on-primary-container': 'hsl(var(--md3-on-primary-container))',
					secondary: 'hsl(var(--md3-secondary))',
					'secondary-container': 'hsl(var(--md3-secondary-container))',
					'on-secondary': 'hsl(var(--md3-on-secondary))',
					'on-secondary-container': 'hsl(var(--md3-on-secondary-container))',
					surface: 'hsl(var(--md3-surface))',
					'surface-variant': 'hsl(var(--md3-surface-variant))',
					'on-surface': 'hsl(var(--md3-on-surface))',
					'on-surface-variant': 'hsl(var(--md3-on-surface-variant))',
					error: 'hsl(var(--md3-error))',
					'error-container': 'hsl(var(--md3-error-container))',
					'on-error': 'hsl(var(--md3-on-error))',
				},
				
				// Window System
				window: {
					bg: 'hsl(var(--window-bg))',
					border: 'hsl(var(--window-border))',
				},
				
				// Traffic Lights
				traffic: {
					red: 'hsl(var(--traffic-light-red))',
					yellow: 'hsl(var(--traffic-light-yellow))',
					green: 'hsl(var(--traffic-light-green))',
				},
				
				// Dock
				dock: {
					bg: 'hsl(var(--dock-bg))',
					border: 'hsl(var(--dock-border))',
				},
				
				// Interactive
				ripple: 'hsl(var(--ripple-color))',
				hover: 'hsl(var(--hover-overlay))',
				pressed: 'hsl(var(--pressed-overlay))',
				
				// Legacy Shadcn Compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				// PortOS System Animations
				'window-appear': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.95) translateY(10px)',
						backdropFilter: 'blur(0px)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1) translateY(0)',
						backdropFilter: 'blur(var(--blur-strength))'
					}
				},
				'window-minimize': {
					'0%': { 
						opacity: '1', 
						transform: 'scale(1)',
						transformOrigin: 'bottom center'
					},
					'100%': { 
						opacity: '0', 
						transform: 'scale(0.1)',
						transformOrigin: 'bottom center'
					}
				},
				'dock-hover': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.1)' }
				},
				'ripple': {
					'0%': { 
						transform: 'scale(0)',
						opacity: '0.6'
					},
					'100%': { 
						transform: 'scale(1)',
						opacity: '0'
					}
				},
				'bounce-in': {
					'0%': { 
						transform: 'scale(0.3)',
						opacity: '0'
					},
					'50%': { 
						transform: 'scale(1.05)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-down': {
					'0%': { 
						transform: 'translateY(-10px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				// Legacy Shadcn
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				// PortOS Animations with MD3 timing
				'window-appear': 'window-appear 0.3s cubic-bezier(0.2, 0, 0, 1)',
				'window-minimize': 'window-minimize 0.5s cubic-bezier(0.2, 0, 0, 1)',
				'dock-hover': 'dock-hover 0.2s cubic-bezier(0.2, 0, 0, 1)',
				'ripple': 'ripple 0.6s cubic-bezier(0.2, 0, 0, 1)',
				'bounce-in': 'bounce-in 0.4s cubic-bezier(0.2, 0, 0, 1)',
				'slide-down': 'slide-down 0.3s cubic-bezier(0.2, 0, 0, 1)',
				// Legacy
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backdropBlur: {
				'portos': 'var(--blur-strength)',
			},
			transitionTimingFunction: {
				'md3': 'cubic-bezier(0.2, 0, 0, 1)',
				'md3-decelerate': 'cubic-bezier(0, 0, 0, 1)',
				'md3-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
