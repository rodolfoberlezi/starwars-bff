const createRequest = require('../helpers/createRequest')
const StarWarsBO = require('../core/businessOperation/starWarsBO')

const CONTROLLER_NAME = 'starwars'


module.exports = {
  sayHi: createRequest(CONTROLLER_NAME, 'sayHi', StarWarsBO),
  listFilms: createRequest(CONTROLLER_NAME, 'listFilms', StarWarsBO),
  infoFilm: createRequest(CONTROLLER_NAME, 'infoFilm', StarWarsBO),
  searchFilm: createRequest(CONTROLLER_NAME, 'searchFilm', StarWarsBO)
}

// {{url}}/films => lista de elementos
// {{url}}/films/:episode_id  => retorna um elemento
// {{url}}/films?q=Title => lista de filmes filtradas pelo nome