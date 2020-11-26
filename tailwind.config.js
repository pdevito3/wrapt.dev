const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.jsx',
    './src/**/*.js',
    './src/**/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {      
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.500'),
            '> :first-child': { marginTop: '-' },
            '> :last-child': { marginBottom: '-' },
            '&:first-child > :first-child': {
              marginTop: '0',
            },
            '&:last-child > :last-child': {
              marginBottom: '0',
            },
            'h1, h2': {
              letterSpacing: '-0.025em',
            },
            'h2, h3': {
              'scroll-margin-block': `${(70 + 40) / 16}rem`,
            },
            'ul > li': {
              paddingLeft: '1.5em',
            },
            'ul > li::before': {
              width: '0.75em',
              height: '0.125em',
              top: 'calc(0.875em - 0.0625em)',
              left: 0,
              borderRadius: 0,
              backgroundColor: theme('colors.gray.300'),
            },
            a: {
              color: theme('colors.cyan.700'),
              fontWeight: theme('fontWeight.medium'),
              textDecoration: 'none',
              boxShadow: theme('boxShadow.link'),
            },
            'a code': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: theme('fontWeight.medium'),
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit',
            },
            code: {
              fontWeight: '400',
              color: theme('colors.violet.600'),
            },
            'code::before': {
              // content: 'none',
            },
            'code::after': {
              // content: 'none',
            },
            pre: {
              backgroundColor: '-',
              color: theme('colors.white'),
              borderRadius: 0,
              marginTop: 0,
              marginBottom: 0,
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
            },
            thead: {
              color: theme('colors.gray.600'),
              borderBottomColor: theme('colors.gray.200'),
            },
            'thead th': {
              paddingTop: 0,
              fontWeight: theme('fontWeight.semibold'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.200'),
            },
            'tbody tr:last-child': {
              borderBottomWidth: '1px',
            },
            'tbody code': {
              fontSize: theme('fontSize.xs')[0],
            },
          },
        },
      }),
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors:{
        violet: colors.violet,
        teal: colors.teal,
        
        code: {
          punctuation: '#A1E8FF',
          tag: '#D58FFF',
          'attr-name': '#4BD0FB',
          'attr-value': '#A2F679',
          string: '#A2F679',
          highlight: 'rgba(134, 239, 172, 0.25)',
        },
      },
      spacing: {
        // 0.5, 1.5, 2.5, and 3.5 | 72, 80, and 96 | percentage based fractional values to the whole spacing scale (1/2, 5/6, 7/12, etc.) | all added via experimental
        "108": "27rem",
        "130": "30rem",
        "142": "33rem",
        "154": "36rem",
        "166": "39rem",
        "178": "42rem",
        "190": "45rem",
        "202": "48rem"
      },
      minHeight: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "108": "27rem",
        "130": "30rem",
        "142": "33rem",
        "154": "36rem",
        "166": "39rem",
        "178": "42rem",
        "190": "45rem",
        "202": "48rem"
      },
      gridTemplateColumns: {
       '16': 'repeat(16, minmax(0, 1fr))',
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
                }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
  ],
}
