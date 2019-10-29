const logger = require('../logger')

const convertErrorToObject = (err, debugMode) => ({
  key: err.key || 'ERROR_NOT_HANDLED',
  statusCode: err.statusCode,
  Date: new Date(),
  message: err.message,
  detail: err.detail,
  stack: debugMode ? err.stack : undefined,
})

const handleError = (err, debugMode = true) => {
  let errObj
  if (!err.isArray) {
    errObj = {
      statusCode: (err.definition || err).statusCode || 500,
      response: convertErrorToObject(err.definition || err, debugMode),
    }
  } else {
    errObj = {
      statusCode: err.definition[0].statusCode || 500,
      response: err.definition.map(def => convertErrorToObject(def, debugMode)),
    }
  }

  logger.error(errObj)
  return errObj
}

module.exports = handleError
