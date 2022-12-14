import cookies from 'browser-cookies'
import typeOf from '~/plugins/lib/type-of'

const debug = require('debug')('app:store.mutations')
const isDebug = false

const mutations = {

  // --- LOCALE ---//
  /**
   * Set locale
   * @param state {Object}
   * @param locale {String}
   */
  SET_LANG (state, locale) {
    const locales = state.config.locales
    if (isDebug) { debug('SET_LANG.state.config.locales', locales) }
    if (Array.isArray(locales) && locales.includes(locale)) {
      state.config.locale = locale
      if (process.client && cookies.get('locale') !== locale) {
        cookies.set('locale', locale)
      }
    }
  },

  // --- THEME ---//
  /**
   * Set primary color for theme
   * @param state {Object}
   * @param color {String}
   */
  SET_THEME_PRIMARY (state, color) {
    state.theme.primary = color
    if (process.client && cookies.get('theme_primary') !== color) {
      cookies.set('theme_primary', color)
    }
  },

  /**
   * Set dark color for theme
   * @param state {Object}
   * @param isDark {Boolean}
   */
  SET_THEME_DARK (state, isDark) {
    state.theme.dark = isDark
    state.theme.name = isDark ? 'dark' : 'light'
    const _isDark = isDark ? '1' : '0'
    if (process.client && cookies.get('theme_dark') !== _isDark) {
      cookies.set('theme_dark', _isDark)
      cookies.set('theme_name', state.theme.name)
    }
  },

  // --- NOTIFICATIONS ---//
  /**
   * Set checkAt for notices
   * @param state {Object}
   * @param checkAt {Object|String}
   */
  SET_NOTICES_CHECKAT (state, checkAt) {
    state.notices.checkAt = typeOf.isObject(checkAt) ? JSON.stringify(checkAt) : checkAt
    if (process.client && cookies.get('notices_checkAt') !== state.notices.checkAt) {
      cookies.set('notices_checkAt', state.notices.checkAt)
    }
  },

  // --- SNACKBAR ---//
  /**
   * Set snack bar
   * @param state {Object}
   * @param snackbar {Object}
   */
  SET_SNACK_BAR (state, snackbar) {
    state.snackbar = Object.assign(state.snackbar, snackbar)
  },

  // --- SYSTEM ---//
  /**
   * Set system
   * @param state {Object}
   * @param system {Object}
   */
  SET_SYSTEM (state, system) {
    state.system = Object.assign(state.system, system)
  },

  /**
   * Set system loading
   * @param state {Object}
   * @param loading {Boolean}
   */
  SET_LOADING (state, loading) {
    state.system.loading = loading
    if (loading && state.system.loadingDelay > 0) {
      setTimeout(() => {
        if (state.system.loading) {
          state.system.loading = false
          state.system.loadingDelay = 0
        }
      }, state.system.loadingDelay)
    }
  },

  /**
   * Set system loadingDelay
   * @param state {Object}
   * @param delay {Number}
   */
  SET_LOADING_DELAY (state, delay) {
    state.system.loadingDelay = delay
  },

  /**
   * Show success
   * @param state {Object}
   * @param value {Object|String}
   */
  SHOW_SUCCESS (state, value) {
    if (typeOf.isString(value)) {
      state.snackbar = { show: true, color: 'success', text: value }
    } else {
      state.snackbar = { show: true, color: 'success', text: value.text, timeout: value.timeout }
    }
  },

  /**
   * Show info
   * @param state {Object}
   * @param value {Object|String}
   */
  SHOW_INFO (state, value) {
    if (typeOf.isString(value)) {
      state.snackbar = { show: true, color: 'info', text: value }
    } else {
      state.snackbar = { show: true, color: 'info', text: value.text, timeout: value.timeout }
    }
  },

  /**
   * Show warning
   * @param state {Object}
   * @param value {Object|String}
   */
  SHOW_WARNING (state, value) {
    if (typeOf.isString(value)) {
      state.snackbar = { show: true, color: 'warning', text: value }
    } else {
      state.snackbar = { show: true, color: 'warning', text: value.text, timeout: value.timeout }
    }
  },

  /**
   * Show error
   * @param state {Object}
   * @param value {Object|String}
   */
  SHOW_ERROR (state, value) {
    if (typeOf.isString(value)) {
      state.snackbar = { show: true, color: 'error', text: value }
    } else {
      state.snackbar = { show: true, color: 'error', text: value.text, timeout: value.timeout }
    }
  }
}

export default mutations
