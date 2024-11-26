import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        "heading-title-1-2832-font-family": "Pretendard-Bold, sans-serif",
        "text-normal-bold-1420-font-family": "Pretendard-Bold, sans-serif",
        "font-family-pretendard": "Pretendard-Bold, sans-serif",
      },
      fontSize: {
        "heading-title-1-2832-font-size": "28px",
        "text-normal-bold-1420-font-size": "14px",
        "font-size-3xl": "28px",
        "font-size-sm": "14px",
        "font-size-md": "16px",
      },
      fontWeight: {
        "heading-title-1-2832-font-weight": "700",
        "text-normal-bold-1420-font-weight": "700",
      },
      lineHeight: {
        "heading-title-1-2832-line-height": "32px",
        "text-normal-bold-1420-line-height": "20px",
        "font-line-height-xl": "32px",
        "font-line-height-sm": "20px",
        "font-line-height-md": "24px",
      },
  		colors: {
        "theme-ink-dark": "#252a31",
        "theme-product-light": "#eaeffc",
        "theme-product-normal": "#3060dc",
        "background-bg-border": "#cbcdd1",
        "theme-white": "#ffffff",
        "theme-ink-light": "#697d95",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
