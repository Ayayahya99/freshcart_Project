/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // تفعيل الدارك مود بناءً على الكلاس
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#0aad0a",
        light: "#f0f3f2",
        dark: "#1a1a1a",
      },
    },
    container: {
      center: true, 
      padding: "0.5rem",  // تصغير الـ padding لمنع المسافات الكبيرة
      screens: {
        sm: "100%", 
        md: "90%",
        lg: "80%",
        xl: "75%",
      },
    },
  },
  plugins: [],
};
