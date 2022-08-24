import nodeConfig from 'config'
import colors from 'vuetify/lib/util/colors'
import vueI18n from '~/plugins/localization/vue-i18n'
import veeValidate from '~/plugins/vuetify/vee-validate'
import syncStore from '~/plugins/lib/sync-store'
import util from '~/plugins/lib/util'
import HttpBox from '~/plugins/lib/http.client.class'
import Avatar from '~/plugins/lib/avatar.class'

const debug = require('debug')('app:plugin.index')

export default (context, inject) => {
  debug(`Start on ${process.server ? 'server' : 'client'}`)

  // Inject to app
  inject('util', util)
  inject('HttpBox', HttpBox)
  inject('Avatar', Avatar)
  inject('colors', colors)
  inject('redirect', context.redirect)
  inject('nodeConfig', nodeConfig)

  // Set Vue plugins
  vueI18n(context)
  veeValidate(context)

  // Set store
  syncStore.setThemeDark(context)
  syncStore.setThemePrimary(context)
  syncStore.setLocale(context)

  // Check auth
  // await context.store.dispatch('checkAuth')
}
