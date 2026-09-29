import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        piyasa: {
          navy: {
            DEFAULT: "#0F172A",
            dark: "#0B1120",
            secondary: "#172554",
            light: "#1E293B",
          },
          teal: {
            DEFAULT: "#0F766E",
            hover: "#115E59",
            light: "#F0FDFA",
            border: "#CCFBF1",
            accent: "#2DD4BF",
          },
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          muted: "#F1F5F9",
          text: {
            primary: "#111827",
            secondary: "#64748B",
            muted: "#94A3B8",
          },
          border: {
            DEFAULT: "#E2E8F0",
            subtle: "#F1F5F9",
          },
          status: {
            success: "#15803D",
            successBg: "#DCFCE7",
            warning: "#B45309",
            warningBg: "#FEF3C7",
            error: "#B91C1C",
            errorBg: "#FEE2E2",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
        card: "0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
        elevated: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
