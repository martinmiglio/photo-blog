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
        50: "#FCFCFD",
        100: "#E9E6F4",
        200: "#C9BDEA",
        300: "#A889E6",
        400: "#8F55E7",
        500: "#7B0EF7",
        600: "#5B1ABC",
        700: "#421E8B",
        800: "#2D1C59",
        900: "#1C1631",
        950: "#15141F"
      },
    },
  },
};

export default config;
