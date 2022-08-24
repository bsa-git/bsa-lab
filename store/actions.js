const debug = require('debug')('app:store.actions')
const isDebug = false

const actions = {

  // --- ServerInit ---//
  nuxtServerInit ({ commit, dispatch }, { req }) {
    if (true && req) { debug(`Start nuxtServerInit on ${process.server ? 'server' : 'client'}`) }
  }

}

export default actions
