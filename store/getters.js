import colors from 'vuetify/lib/util/colors'
import themeColorOptions from '~/api/app/theme-color-options.json'
import util from '~/plugins/lib/util'
// const debug = require('debug')('app:store.getters');

const getters = {

  getConfig: (state) => {
    return state.config
  },

  getPersonalData: (state) => {
    return state.personalData
  },

  getSnackBar: (state) => {
    return state.snackbar
  },

  getTheme: (state) => {
    return state.theme
  },

  getNotices: (state) => {
    return state.notices
  },

  getSystem: (state) => {
    return state.system
  },

  getLoading: (state) => {
    return state.system.loading
  },

  getPrimaryColor: (state) => {
    const theme = state.theme
    // Get primary color
    const optColor = themeColorOptions.find(option => option.key === theme.primary)
    let subColor = optColor ? optColor.value[theme.name] : ''
    subColor = subColor.replace('-', '')
    const primaryColor = subColor ? colors[theme.primary][subColor] : colors[theme.primary].base
    return primaryColor
  },

  getPrimaryBaseColor: (state) => {
    const theme = state.theme
    // Get primary base color
    const primaryColor = colors[theme.primary].base
    return primaryColor
  },

  getFullPath: state => (path) => {
    const _path = util.stripSlashes(path)
    const fullPath = (state.config.locale === state.config.fallbackLocale) ? `/${_path}` : `/${state.config.locale}/${_path}`
    return fullPath
  }
}

export default getters
