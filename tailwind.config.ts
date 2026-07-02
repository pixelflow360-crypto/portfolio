import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Absans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Absans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
