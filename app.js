const swaggerTools = require('swagger-tools')
// const jwt = require('jsonwebtoken');
const cors = require('cors')
const app = require('express')()
const swaggerDoc = require('./api/swagger/swagger.json')
const { Exception, errorDefinitions, handleError } = require('./api/helpers/errors')
const logger = require('./api/helpers/logger')

const options = {
  swaggerUi: './api/swagger/swagger.json',
  controllers: './api/controllers',
}

module.exports = app

const customErrorHandler = (err, req, res, next) => {
  let customError = Exception.generateCustomError({
    ...errorDefinitions.BAD_REQUEST_PARAMETER,
    values: { '#INPUT': err.paramName || 'not set' },
    message: `swagger validation: code:${err.code || 'not set'} message:${err.message ||
      'not set'}`,
    stack: err.stack || undefined,
  })
  customError = handleError(customError, req.headers['debug-trace'])
  res.status(customError.statusCode).json(customError.response)
}

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata())
  logger.info('1. middleware.swaggerMetadata - OK')

  app.use(cors({
    headers: '*',
  }))
  logger.info('2. cors - OK')

  // Setup security handlers
  app.use(middleware.swaggerSecurity())
  logger.info('3. middleware.swaggerSecurity - OK')

  app.use(middleware.swaggerValidator())
  logger.info('4. middleware.swaggerValidator - OK')

  app.use(customErrorHandler)
  logger.info('5. customErrorHandler - OK')

  app.use(middleware.swaggerRouter(options))
  logger.info('6. middleware.swaggerRouter - OK')

  app.use(middleware.swaggerUi({
    swaggerUi: '/',
  }))
  logger.info('7. middleware.swaggerUi - OK')

  const port = process.env.PORT || 3100
  const server = app.listen(port, () => {
    let host = server.address().address
    host = host === '::' ? 'localhost' : host
    logger.info('listening at http://%s:%s', host, port)
  })
})
