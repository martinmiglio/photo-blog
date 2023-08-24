const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      theme: {
        50: "#E8E8E8",
        100: "#D8DAD3",
        200: "#B4CD9D",
        300: "#7BCE5F",
        400: "#25C922",
        500: "#00A824",
        600: "#188316",
        700: "#31651F",
        800: "#3A4D28",
        900: "#32352C",
        950: "#2E2E2E",
      },
    },
  },
};

export default config;
