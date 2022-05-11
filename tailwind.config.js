module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      screens: {
        '3xl': '1920px'
      },
      animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards'
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 }
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      colors: {
        neutral: {
          DEFAULT: '#fff',
          100: '#F5F9FF',
          200: '#E6EDF7',
          300: '#DAE4F2',
          500: '#8FA3BF',
          600: '#7C899C',
          900: '#252F3D'
        },
        brand: {
          light: {
            DEFAULT: '#E5F0FF',
            secondary: '#CCE1FF'
          },
          primary: {
            DEFAULT: '#176FEB',
            hover: '#1667D9'
          },
          secondary: {
            DEFAULT: '#FF80FF',
            hover: '#F279F2'
          }
        },
        green: {
          DEFAULT: '#29CC74',
          light: '#CCFFE3'
        },
        red: {
          DEFAULT: '#E07F4F',
          light: '#FFDFD9'
        },
        aerolab: {
          DEFAULT: '#FF8800',
          to: '#FF6600'
        }
      }
    }
  },
  plugins: []
};
