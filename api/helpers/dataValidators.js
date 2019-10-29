/* eslint-disable no-console, no-nested-ternary */
const _ = require('lodash')

const validateData = (
  data,
  {
    debug = false,
    // types
    allowNumber = true,
    allowString = true,
    allowArray = true,
    allowObject = true,
    allowBoolean = false,
    // false/empty values
    allowZero = true,
    allowNegative = false,
    allowFalse = false,
    allowNull = false,
    allowEmptyString = false,
    allowEmptyArray = false,
    allowEmptyObject = false,
  } = {},
) => {
  // general false value checks
  // const isNull = data === null
  // const isUndefined = data === undefined
  // const isNaN = Number.isNaN(data)
  const isNull = _.isNull(data)
  const isUndefined = _.isUndefined(data)
  const isNaN = _.isNaN(data)

  // number checks
  // const isNumber = typeof data === 'number'
  const isNumber = _.isNumber(data)
  const isZero = data === 0
  const isNegative = isNumber && data < 0
  const isValidNumber = isNumber ? (isNegative ? allowNegative : isZero ? allowZero : true) : false

  // string checks
  // const isString = typeof data === 'string'
  const isString = _.isString(data)
  const isEmptyString = data === ''
  const isValidString = isString ? (isEmptyString ? allowEmptyString : true) : false

  // array checks
  // const isArray = data instanceof Array
  const isArray = _.isArray(data)
  const isEmptyArray = isArray && _.isEmpty(data)
  const isValidArray = isArray ? (isEmptyArray ? allowEmptyArray : true) : false

  // boolean checks
  // const isBoolean = typeof data === 'boolean'
  const isBoolean = _.isBoolean(data)
  const isFalse = data === false
  const isValidBoolean = isBoolean ? (isFalse ? allowFalse : true) : false

  // object checks
  // const isObject = _.isPlainObject(data)
  // const isEmptyObject = !(isObject && Object.keys(data).length)
  const JSONdata = JSON.stringify(data)
  const isObject = JSONdata && JSONdata[0] === '{'
  const isEmptyObject = !!(isObject && _.isEmpty(data))
  const isValidObject = isObject ? (isEmptyObject ? allowEmptyObject : true) : false

  const isValidData =
    !isUndefined &&
    !isNaN &&
    ((allowNull && isNull) ||
      (allowString && isValidString) ||
      (allowNumber && isValidNumber) ||
      (allowBoolean && isValidBoolean) ||
      (allowArray && isValidArray) ||
      (allowObject && isValidObject))

  if (!isValidData && debug) {
    console.warn('Data failed "isValidData" check:')
    console.log(data)
  }

  return isValidData
}

module.exports = {
  validateData,
  isValidNomEmptyData(data) {
    return validateData(data, {
      allowNumber: true,
      allowZero: true,
      allowString: true,
      allowEmptyString: false,
      allowArray: true,
      allowEmptyArray: false,
      allowObject: true,
      allowEmptyObject: false,
      allowBoolean: false,
    })
  },
  isValidNumber(data) {
    return validateData(data, {
      allowNumber: true,
      allowZero: true,
      allowString: false,
      allowBoolean: false,
      allowArray: false,
      allowObject: false,
    })
  },
  isValidPositiveNumber(data) {
    return validateData(data, {
      allowNumber: true,
      allowZero: true,
      allowNegative: false,
      allowString: false,
      allowBoolean: false,
      allowArray: false,
      allowObject: false,
    })
  },
  isValidNonEmptyNumber(data) {
    return validateData(data, {
      allowNumber: true,
      allowZero: false,
      allowString: false,
      allowBoolean: false,
      allowArray: false,
      allowObject: false,
    })
  },
  isValidString(data) {
    return validateData(data, {
      allowString: true,
      allowEmptyString: true,
      allowNumber: false,
      allowBoolean: false,
      allowArray: false,
      allowObject: false,
    })
  },
  isValidNonEmptyString(data) {
    return validateData(data, {
      allowString: true,
      allowEmptyString: false,
      allowNumber: false,
      allowBoolean: false,
      allowArray: false,
      allowObject: false,
    })
  },
  isValidArray(data) {
    return validateData(data, {
      allowArray: true,
      allowEmptyArray: true,
      allowString: false,
      allowNumber: false,
      allowBoolean: false,
      allowObject: false,
    })
  },
  isValidNonEmptyArray(data) {
    return validateData(data, {
      allowArray: true,
      allowEmptyArray: false,
      allowString: false,
      allowNumber: false,
      allowBoolean: false,
      allowObject: false,
    })
  },
  isValidObject(data) {
    return validateData(data, {
      allowObject: true,
      allowEmptyObject: true,
      allowString: false,
      allowNumber: false,
      allowBoolean: false,
      allowArray: false,
    })
  },
  isValidNonEmptyObject(data) {
    return validateData(data, {
      allowObject: true,
      allowEmptyObject: false,
      allowString: false,
      allowNumber: false,
      allowBoolean: false,
      allowArray: false,
    })
  },
}
