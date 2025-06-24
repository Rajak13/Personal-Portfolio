/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "*.{js,ts,jsx,tsx,mdx}"],
    darkMode: ["class"],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7c3aed",
            800: "#6b21a8",
            900: "#581c87",
          },
          slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        animation: {
          orbit: "orbit 20s linear infinite",
          float: "float 6s ease-in-out infinite",
          "pulse-glow": "pulse-glow 2s ease-in-out infinite",
          "gradient-shift": "gradient-shift 3s ease infinite",
        },
        keyframes: {
          orbit: {
            "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
            "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
          },
          float: {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
          "pulse-glow": {
            "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
            "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" },
          },
          "gradient-shift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        },
        backdropBlur: {
          xs: "2px",
        },
      },
    },
    plugins: [],
  }
  