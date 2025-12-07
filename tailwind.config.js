/** @type {import('tailwindcss').Config} */
module.exports = {
  // Pastikan array 'content' ini mencakup semua lokasi file Anda
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Untuk Pages Router (jika ada)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Untuk komponen
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Untuk App Router (PENTING!)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
