import Vue from 'vue'
import VueI18n from 'vue-i18n'

const loMerge = require('lodash/merge')

let en = require('~/plugins/localization/locales/en.json')
let ru = require('~/plugins/localization/locales/ru.json')
const enUnits = require('~/plugins/localization/locales/en-units.json')
const ruUnits = require('~/plugins/localization/locales/ru-units.json')

en = loMerge({}, en, enUnits)
ru = loMerge({}, ru, ruUnits)

Vue.use(VueI18n)

export default (context) => {
  const app = context.app
  const config = context.store.state.config
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: config.locale,
    fallbackLocale: config.fallbackLocale,
    messages: {
      en,
      ru
    }
  })
  context.$t = VueI18n.prototype.t.bind(app.i18n)

  app.i18n.path = (link) => {
    const _link = app.$util.stripSlashes(link)
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${_link}`
    }
    return `/${app.i18n.locale}/${_link}`
  }
}
