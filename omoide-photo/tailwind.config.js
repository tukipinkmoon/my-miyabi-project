/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'elderly': '20px',  // 高齢者向け基本サイズ
        'elderly-lg': '24px',
        'elderly-xl': '32px',
      },
      spacing: {
        'tap': '60px',  // タップしやすい最小サイズ
      },
      colors: {
        'warm': {
          50: '#fff5f7',
          100: '#ffeef8',
          200: '#ffb6c1',
          300: '#ff69b4',
        }
      }
    },
  },
  plugins: [],
}
