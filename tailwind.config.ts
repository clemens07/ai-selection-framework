import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#122023",
        mist: "#ecf2ef",
        pine: "#1a5f52",
        sand: "#f6efe6",
        ember: "#d46b08",
        berry: "#9f1239",
      },
      boxShadow: {
        report: "0 24px 80px rgba(18, 32, 35, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
