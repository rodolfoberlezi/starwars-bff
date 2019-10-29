const logger = require('../../helpers/logger')

const shapeFilm = require('../businessRules/starwars/shapeFilm')
const shapeCharacter = require('../businessRules/starwars/shapeCharacter')
const shapePlanet = require('../businessRules/starwars/shapePlanet')

const StarWarsService = require('../services/starWarsService')

const Dependency = {
  shapeFilm,
  shapeCharacter,
  shapePlanet
}

class StarWarsBO {
  constructor(params) {
    this.params = params
  }

  async sayHi() {
    return 'Hi Luke!'
  }

  async listFilms() {
    logger.debug('starWarsBO.listFilms')

    try {
      const films = await StarWarsService.listFilms()

      return films

    } catch (error) {
      console.log(error)
    }
  }

  async infoFilm() {
    logger.debug('starWarsBO.infoFilm')

    try {
      const film = await StarWarsService.infoFilm(this.params.episode_id)
      console.log(film)
      const filmModel = Dependency.shapeFilm(film)

      for (let character of film.characters) {
        filmModel.characters.push(await this._fillCharacter(character))
      }

      for (let planet of film.planets) {
        filmModel.planets.push(await this._fillPlanet(planet))
      }

      return filmModel
    } catch (error) {
      console.log(error)
    }
  }

  async searchFilm() {
    let { title } = this.params

    if (!title) {
      return 'No title filter added. Please, type one to find a movie'
    }

    try {
      const film = await StarWarsService.searchFilm(title)

      return film
    } catch (error) {
      console.log(error)
    }
  }

  async _fillCharacter(character_url) {
    const character_data = await StarWarsService.getUrl(character_url)
    const data = Dependency.shapeCharacter(character_data)
    return data
  }

  async _fillPlanet(planet_url) {
    const planet_data = await StarWarsService.getUrl(planet_url)
    const data = Dependency.shapePlanet(planet_data)
    return data
  }

}

module.exports = StarWarsBO