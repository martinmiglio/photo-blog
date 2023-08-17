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
        50: "#FCF2F6",
        100: "#FBE5EE",
        200: "#F8C4DC",
        300: "#F8A5D0",
        400: "#F980C5",
        500: "#FF5ABF",
        600: "#F41F98",
        700: "#C20F6C",
        800: "#7B0E41",
        900: "#3D0A1F",
        950: "#1D060F",
      },
    },
  },
};

export default config;
