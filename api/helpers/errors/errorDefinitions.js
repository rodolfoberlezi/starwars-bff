const httpCodes = require('../enums/httpCodes')

const errorDefinitions = {
  UNKNOWN: {
    // Generic error
    key: 'UNKNOWN',
    statusCode: httpCodes.ERROR,
    message: 'API failed to execute this action through an unknown cause, #INPUT',
    detail: 'Unfortunately this error do not provide more information',
  },
  BAD_REQUEST_PARAMETER: {
    // invalid parameter value
    key: 'BAD_REQUEST_PARAMETER',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'An input value whas not accepeted',
    detail: '{parameterName: #INPUT}',
  },
  BAD_REQUEST_PARAMETER_UNSET: {
    // required parameter not filled
    key: 'BAD_REQUEST_PARAMETER_UNSET',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'An input value whas not informed',
    detail: '{parameterName: #INPUT}',
  },

  // data errors
  LOGICAL_DATA_DUPLICATED: {
    key: 'LOGICAL_DATA_DUPLICATED',
    statusCode: httpCodes.BAD_REQUEST,
    message: '#DATA_NAME had duplication criteria affected',
  },
  CRITICAL_DATA_NOT_FOUND: {
    // critical data for the operation not found
    key: 'CRITICAL_DATA_NOT_FOUND',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'Critical data not found for informed parameters',
    detail: '{dataDescription: #DATA_NAME}',
  },
  RESTRICTED_ACTION: {
    key: 'RESTRICTED_ACTION',
    statusCode: httpCodes.BAD_REQUEST,
    message: '#ACTION not alowed for #DATA_NAME',
  }
}

module.exports = errorDefinitions
