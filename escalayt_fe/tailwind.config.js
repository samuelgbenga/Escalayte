/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 8px 8px -4px #1018280A, 0px 20px 24px -4px #1018281A",
      },
      filter: {
        blurred: "blur(5px)",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      zIndex: {
        '-1': '-1',
        '50': '50',
      },
      colors: {
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      maxWidth: {
        '1180': '1180px',
      },
    },
  },
  plugins: [],
};
