// import config from 'config'
// import config from 'config'
import util from '~/plugins/lib/util'

const debug = require('debug')('app:nuxt.config')
const isDebug = false

/**
 * Get locales
 * @param envLocales
 * @return {Array}
 */
const locales = (envLocales) => {
  return util.stripSpecific(envLocales, ';').split(';').map(item => item.trim())
}

export default () => {
  if (isDebug && process.client) { console.log('process.env.NODE_CONFIG:', JSON.parse(process.env.NODE_CONFIG)) }

  const personalData = JSON.parse(process.env.NODE_CONFIG).personalData

  return {
    config: {
      // --- LOCALES ---//
      locales: locales(process.env.LOCALES),
      locale: (process.env.LOCALE || 'en').trim(),
      fallbackLocale: (process.env.FALLBACK_LOCALE || 'en').trim(),

      // --- GENERAL ---//
      host: (process.env.HOST || 'localhost').trim(),
      port: (process.env.PORT || '3030').trim(),
      nodeEnv: (process.env.NODE_ENV || 'development').trim(),
      debug: (process.env.DEBUG || '').trim(),
      baseUrl: (process.env.BASE_URL || 'http://localhost:3030').trim(),
      homePath: (process.env.HOME_PATH || '/').trim(),
      isAvatar: util.isTrue(process.env.PERSONAL_IS_AVATAR)

      // logoIcon: personalData.logoIcon,
      // logoImage: personalData.logoImg,
      // logoTitle: personalData.logoTitle,
      // copyright: personalData.copyright,
      // githubProject: personalData.designedWithUrl,
      // website: personalData.contact.website,
      // email: personalData.contact.emailPersonal
    },

    // --- PERSONAL-DATA ---//
    personalData,

    // --- SNACKBAR ---//
    snackbar: {
      show: false,
      text: 'Test success!',
      color: 'purple',
      timeout: 6000
    },

    // --- THEME ---//
    theme: {
      primary: 'indigo',
      dark: false,
      name: 'light'
    },

    // --- NOTIFICATIONS ---//
    notices: {
      checkAt: ''
    },

    // --- SYSTEM ---//
    system: {
      loading: false,
      loadingColor: 'amber',
      loadingDelay: 0
    }
  }
}
