/* eslint-disable no-unused-vars */
import useragent from 'express-useragent'
import i18n from '~/middleware/i18n'

const debug = require('debug')('app:middleware.init-app')
const isDebug = false

export default function (context) {
  try {
    // Init locales
    i18n(context)

    // Get context content
    const { $t, store, redirect, route } = context

    // GoTo homePath
    if (context.route.path === '/') {
      const config = context.store.getters.getConfig
      context.redirect(config.homePath)
    }
    // Set userAgent for context
    let userAgent
    if (process.server) {
      userAgent = context.req.useragent
    } else {
      userAgent = useragent.parse(navigator.userAgent)
    }
    context.userAgent = userAgent
  } catch (e) {
    context.error(e)
  }
}
