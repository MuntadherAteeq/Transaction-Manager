import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        outline: "var(--outline)",
        hover: "var(--hover)",
        hover_x2: "var(--hover-x2)",
        primary: "var(--primary)",
        positive: "var(--positive)",
        negative: "var(--negative)",
      },
    },
  },
  plugins: [],
}
export default config
