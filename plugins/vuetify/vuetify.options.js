// vuetify.options.js
import colors from 'vuetify/lib/util/colors'

export default function () {
  return {
    theme: {
      dark: true,
      themes: {
        light: {
          secondary: colors.grey.lighten5
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  }
}
