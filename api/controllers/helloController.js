// const httpCodes = require('../helpers/enums/httpCodes');
const createRequest = require('../helpers/createRequest')
const HelloBO = require('../core/businessOperation/HelloBO')

const CONTROLLER_NAME = 'hello'


module.exports = {
  /** --- GET ------------------------------------------- */
  getHello: createRequest(CONTROLLER_NAME, 'getHello', HelloBO),
}
