module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '84': '21rem',
        '108': '27rem',
        '112': '28rem',
        '128': '32rem',
        '192': '46rem',
        '9/16': 'calc(56.25% - 3.5rem)'
      },

      minHeight: {
        '4': '1rem',
        '24': '6rem',
        '56': '14rem'
      },

      colors: {
        'main': '#EEE'
      }
    },
    screens: {
      'exsm': '320px',
      'xs': '460px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  variants: {
    extend: {
      display:['group-hover']
    },
  },
  plugins: [],
}
