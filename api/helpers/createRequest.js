const _ = require('lodash')
const handleError = require('./errors/ErrorHandler')
const logger = require('./logger')
const httpCodes = require('./enums/httpCodes')
const { isValidNomEmptyData } = require('./dataValidators')

const parseSwaggerParameters = async (params) => {
  const result = Object.keys(params).reduce((obj, key) => {
    const camelCasedKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase())
    return {
      ...obj,
      [camelCasedKey]: params[key].value,
    }
  }, {})

  return _.omit({ ...result, ...result.body }, 'body')
}

/**
 * Create Request to B.O.
 * @param (funcName: string, callback: (res, data))
 * @returns returns express controller
 */
function createRequest(modelName, funcName, OperationClass, callback) {
  return async (req, res) => {
    logger.info(`${modelName}Controller.${funcName}`)
    const params = await parseSwaggerParameters(req.swagger.params || {})
    try {
      const operation = new OperationClass(params)
      const data = await operation[funcName]()
      if (callback) {
        callback(res, data)
        return false
      }
      let result = data

      if (!isValidNomEmptyData(result)) {
        return res.status(httpCodes.NO_CONTENT).end()
      }

      if (data.contentRange && data.data) {
        result = result.data
        res.set('contentRange', data.contentRange)
        res.set('acceptRange', result.length)
      }
      return res.status(httpCodes.OK).json(result)
    } catch (err) {
      const customError = handleError(err, req.headers['debug-trace'])
      return res.status(customError.statusCode || httpCodes.ERROR).json(customError.response)
    }
  }
}

module.exports = createRequest
