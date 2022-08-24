import cookies from 'browser-cookies'
import goTo from 'vuetify/es5/services/goto'

import loCloneDeep from 'lodash/cloneDeep'
import loOrderBy from 'lodash/orderBy'

const debug = require('debug')('app:plugins.util')
const isDebug = true

/**
 * Delay time
 * @param sec
 * @return {Promise}
 */
const delayTime = function (sec = 1) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      if (isDebug) { debug(`delayTime: ${sec * 1000} MSec`) }
      resolve('done!')
    }, sec * 1000)
  })
}

/**
 * Pause
 * @param ms
 * @return {Promise}
 */
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Awaiting positive completion of a function
 * @param fn
 * @param cb
 * @param delay
 */
const waitTimeout = function (fn, cb = null, delay = 0) {
  const _delay = delay || 1000
  let timerId = setTimeout(function request () {
    const result = fn()
    if (!result) {
      timerId = setTimeout(request, _delay)
    } else {
      if (cb) { cb() }
      clearInterval(timerId)
    }
  }, _delay)
}

/**
 * Go To Scroll
 * Programmatic Scrolling
 * @param to {string | number | HTMLElement | VueComponent}
 * @param params {Object}
 */
const goToScroll = function (to, params = {}) {
  const _params = {
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic'
  }
  goTo(to, Object.assign(_params, params))
}

/**
 * Strip slashes
 * @param value String
 * @return {string|*|void}
 */
const stripSlashes = function (value) {
  return value.replace(/^(\/*)|(\/*)$/g, '')
}

/**
 * Strip slashes
 * @param value String
 * @param symbol String
 * @return {string|*|void}
 */
const stripSpecific = function (value, symbol = '') {
  const regEx = new RegExp('^[' + symbol + ']+|[' + symbol + ']+$', 'g')
  const trimValue = symbol ? value.replace(regEx, '') : value.trim()
  return trimValue
}

/**
 * Get capitalize string
 * @param value
 * @param prefix
 */
const getCapitalizeStr = function (value, prefix = '') {
  const loCapitalize = require('lodash/capitalize')
  const loWords = require('lodash/words')
  let _value = loCapitalize(value)
  if (prefix) {
    const words = loWords(_value).map(word => loCapitalize(word))
    _value = words.join('')
    _value = prefix + _value
  }
  return _value
}

/**
 * Is true
 * @param value String|Any
 * @return boolean
 */
const isTrue = function (value) {
  if (typeof (value) === 'string') {
    value = value.trim().toLowerCase()
  }
  switch (value) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true
    default:
      return false
  }
}

/**
 * Get number from value
 * @param value
 * @return {number}
 */
const getNumber = function (value) {
  return Number.isInteger(value) ? value : Number.parseInt(value)
}

/**
 * Get Regex
 * @param type
 * @return {String}
 */
const getRegex = function (type) {
  if (typeof (type) === 'string') {
    type = type.trim().toLowerCase()
  }
  switch (type) {
    case 'phone':
    /*
      (123) 456-7890
      +(123) 456-7890
      +(123)-456-7890
      +(123) - 456-7890
      +(123) - 456-78-90
      123-456-7890
      123.456.7890
      1234567890
      +31636363634
      +380980029669
      075-63546725
      */
      return '^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$'
    case 'zip_code':
    /*
      12345
      12345-6789
      */
      return '^[0-9]{5}(?:-[0-9]{4})?$'
    case 'lat':
    /*
      +90.0
      45
      -90
      -90.000
      +90
      47.123123
      */
      return '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$'
    case 'long':
    /*
      -127.554334
      180
      -180
      -180.0000
      +180
      179.999999
      */
      return '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$'
    case 'lat_and_long':
    /*
      +90.0, -127.554334
      45, 180
      -90, -180
      -90.000, -180.0000
      +90, +180
      47.1231231, 179.99999999
      */
      return '^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$'
    default:
      return '//g'
  }
}

/**
 * getAccessToken
 * @returns {String|null}
 */
const getAccessToken = function () {
  if (process.client) {
    return cookies.get('feathers-jwt')
  } else {
    return null
  }
}

/**
 * setAccessToken
 * @param token
 */
const setAccessToken = function (token) {
  if (process.client) {
    cookies.set('feathers-jwt', token)
  }
}

/**
 * isAccessToken
 * @returns {boolean}
 */
const isAccessToken = function () {
  return !!getAccessToken()
}

/**
 * removeAccessToken
 */
const removeAccessToken = function () {
  if (process.client) {
    cookies.erase('feathers-jwt')
  }
}

/**
 * readCookie
 * Reads and returns the contents of a cookie with the provided name for server.
 * @param cookies {String}
 * @param name {String}
 * @returns {String|undefined}
 */
function readCookie (cookies, name) {
  if (!cookies) {
    return undefined
  }
  const nameEQ = name + '='
  const ca = cookies.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

/**
 * This metod allows specifying the sort orders of the iteratees to sort by.
 * If orders is unspecified, all values are sorted in ascending order.
 * Otherwise, specify an order of "desc" for descending or "asc" for ascending sort order of corresponding values.
 * @method orderByItems
 * sort array by number field
 * @param {Array|Object} items // The collection to iterate over.
 * e.g var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 * @param {Array[]|Function[]|Object[]|string[]} iteratees // The iteratees to sort by
 * e.g. ['user', 'age']
 * @param {String[]} orders // The sort orders of iteratees
 * e.g. ['asc', 'desc']
 * @returns {Array} // Returns the new sorted array.
 */
function orderByItems (items, iteratees, orders) {
  return loOrderBy(items, iteratees, orders)
};

/**
 * Query params
 * @param obj
 * @returns {string}
 */
const qlParams = function (obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Expected object. (qlParams)')
  }

  return stringify(obj, undefined, undefined, '', '')
}

/**
 * Stringify to represent an object as a string
 * @param obj
 * @param spacer
 * @param separator
 * @param leader
 * @param trailer
 * @returns {string}
 */
const stringify = function (obj, spacer = ' ', separator = ', ', leader = '{', trailer = '}') {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj)
  }

  const str = Object
    .keys(obj)
    .map(key => `${key}:${spacer}${stringify(obj[key], spacer, separator)}`)
    .join(', ')

  return `${leader}${str}${trailer}`
}

/**
 * Get context for log
 * @param context
 * @return {Object}
 */
const getHookContext = function (context) {
  const target = {}
  const { service, path, method, type, params, id, data, result, error } = context

  if (service) { target.service = service }
  if (service && service.FeathersVuexModel) { target.Model = service.FeathersVuexModel }
  if (path) { target.path = path }
  if (method) { target.method = method }
  if (type) { target.type = type }
  if (params) { target.params = params }
  if (id) { target.id = id }
  if (data && type === 'before') { target.data = data }
  if (result) { target.result = result }
  if (error) { target.error = error }
  return target
}

/**
 * The value to recursively clone
 * @method cloneObject
 * @param {Object?} obj - Object to clone
 * @returns {Object} Cloned object
 */
const cloneObject = function (obj) {
  return loCloneDeep(obj)
}

export default {
  delayTime,
  pause,
  waitTimeout,
  goToScroll,
  stripSlashes,
  stripSpecific,
  getCapitalizeStr,
  isTrue,
  getNumber,
  getRegex,
  getAccessToken,
  setAccessToken,
  isAccessToken,
  removeAccessToken,
  // verifyJWT,
  readCookie,
  orderByItems,
  qlParams,
  stringify,
  getHookContext,
  cloneObject
}
