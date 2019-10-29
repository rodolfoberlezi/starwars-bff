const request = require('request')

const logger = require('../../helpers/logger')
const PATH = 'https://swapi.co/api'

class StarWarsService {

  async listFilms() {
    logger.debug('StarWarsService.listFilms')

    let path = `${PATH}/films`
    console.log(path)

    return new Promise((resolve, reject) => {
      request.get({
        url: path,
        json: true
      }, (err, res, body) => {
        if (err)
          reject(err)

        resolve(body)
      })
    })
  }

  async infoFilm(episode_id) {
    logger.debug('StarWarsService.infoFilm')

    let path = `${PATH}/films/${episode_id}`
    console.log(path)

    return new Promise((resolve, reject) => {
      request.get({
        url: path,
        json: true
      }, (err, res, body) => {
        if (err)
          reject(err)

        resolve(body)
      })
    })
  }

  async searchFilm(title) {
    logger.debug('StarWarsService.searchFilm')

    if (title) {
      let path = `${PATH}/films/?search=${title}`

      return new Promise((resolve, reject) => {
        request.get({
          url: path,
          json: true
        }, (err, res, body) => {
          if (err)
            reject(err)

          resolve(body)
        })
      })
    }

    return 'Hello Star Wars Geek'
  }

  async getUrl(request_url) {
    logger.debug('StarWarsService.getUrl')

    console.log('Request url' + request_url)

    return new Promise((resolve, reject) => {
      request.get({
        url: request_url,
        json: true
      }, (err, res, body) => {
        if (err)
          reject(err)

        resolve(body)
      })
    })
  }
}


module.exports = new StarWarsService()