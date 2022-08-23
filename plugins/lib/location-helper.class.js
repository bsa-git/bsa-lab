'use strict'

import loHas from 'lodash/has'

export default class LocationHelper {
  constructor (url) {
    const location = document.createElement('a')
    location.href = url || window.location.href

    this.url = location.href.split('?')[0]
    this.hash = location.hash
    this.host = location.host
    this.hostname = location.hostname
    this.href = location.href
    this.origin = location.origin
    this.pathname = location.pathname
    this.port = location.port
    this.protocol = location.protocol
    this.search = location.search
    this.source = location
    this.params = {}
    this.setParams()
  }

  mergeParams (params) {
    if (({}).toString.call(params) !== '[object Object]') { return this }

    for (const name in params) {
      if (loHas(params, name)) {
        this.params[name] = params[name]
      }
    }
    return this
  }

  setParams (params) {
    if (({}).toString.call(params) === '[object Object]') { return this.mergeParams(params) }

    let arr = []; const paramsArr = typeof params === 'string' ? params : this.search.replace(/^\?/, '').split('&')

    for (let i = 0; i < paramsArr.length; i++) {
      if (!paramsArr[i]) { continue }
      arr = paramsArr[i].split('=')

      if (!arr[0]) { continue }
      this.params[arr[0]] = arr[1]
    }
    return this
  }

  getParams (name) {
    return name ? this.params[name] : this.params
  }

  removeParams (params) {
    if (!params) {
      this.params = {}
      return this
    }
    if (typeof params === 'string') { params = [params] }
    if (({}).toString.call(params) !== '[object Array]') { return this }
    for (let i = 0; i < params.length; i++) {
      if (loHas(this.params, params[i])) {
        delete this.params[params[i]]
      }
    }
    return this
  }

  serialize (traditional = true) {
    if (traditional) {
      const result = []; const params = this.getParams()
      for (const name in params) {
        if (loHas(params, name)) {
          result.push(name + '=' + params[name])
        }
      }
      return this.url + (result.length > 0 ? '?' + result.join('&') : '')
    }
    return { url: this.url, params: this.getParams() }
  }
}
