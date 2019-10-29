const logger = require('../../helpers/logger')
const helloTransformer = require('../../helpers/transformers/helloTransformer')
const shapeMessage = require('../businessRules/hello/shapeMessage')

const Dependency = {
  shapeMessage,
  helloTransformer
}

class HelloBO {
  constructor(params) {
    this.params = params
  }

  async getHello() {
    logger.debug('HelloBO.getHello')
    const criteria = {
      visitor: this.params.name,
    }
    const data = await Dependency.shapeMessage(criteria) //aplica as regras de negócios
    return Dependency.helloTransformer.helloObj(data) //transforma o objeto para o modelo que deseja retornar
  }
}

module.exports = HelloBO
