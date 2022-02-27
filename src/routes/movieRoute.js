const { Router } = require('express');
const router = Router();

const {
  getOneMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

// validation
const validate = require('../middlewares/validate');
const movieValidator = require('../controllers/schemasValidations/movieValidation');

/**
 * Modelo Esquema de Generos
 * @typedef {object} Gender
 * @property {string} name.required - Nombre de Genero
 * @property {string} image.required - Imagen de este genero
 */
/**
 * Modelo Esquema de Peliculas/Series
 * @typedef {object} Movie
 * @property {string} name.required - Titulo de pelicula/serie
 * @property {string} score.required - Puntuacion del 1 al 5
 * @property {string} image.required - Poster de pelicula
 * @property {string} dateCreated.required - Fecha estreno de pelicula
 * @property {integer} GenderId.required - Id de Genero asociado a la pelicula
 * @property {array<Character>} characters - Personajes asociados
 * @property {Gender} Gender - Info Genero asociado
 */

/**
 * GET /api/v1/movies
 * @summary Lista todas las peliculas, y permite filtrar por genero, ordernar por fecha, y buscar por nombre.
 * @tags movies
 * @security Bearer
 * @param {string} name.query - Buscar por titulo de pelicula
 * @param {integer} genre.query - Filtro por `Id` genero de pelicula
 * @param {string} order.query - Order por fecha de creacion - enum:ASC,DESC
 * @return {object} 200 - success response
 */
router.get('/', getMovies);

/**
 * GET /api/v1/movies/{id}
 * @summary Recibe los detalles de una determinada pelicula.
 * @tags movies
 * @security Bearer
 * @param {string} id.path.required - identificador de pelicula
 * @return {object} 200 - success response
 */
router.get('/:id', getOneMovie);

/**
 * POST /api/v1/movies/
 * @summary Crea una nueva pelicula/serie.
 * @tags movies
 * @security Bearer
 * @param {object} request.body.required - Datos Necesarios
 * @return {object} 201 - success response
 */
router.post('/', validate(movieValidator.movie), createMovie);

/**
 * PUT /api/v1/movies/{id}
 * @summary Actualiza datos de una pelicula/serie.
 * @tags movies
 * @security Bearer
 * @param {string} id.path.required - identificador de pelicula
 * @param {object} request.body.required - Datos Necesarios
 * @return {object} 200 - success response
 */
router.put('/:id', validate(movieValidator.movie), updateMovie);

/**
 * DELETE /api/v1/movies/{id}
 * @summary Elimina una determinada pelicula/serie.
 * @tags movies
 * @security Bearer
 * @param {string} id.path.required - identificador de pelicula
 * @return {object} 200 - success response
 */
router.delete('/:id', deleteMovie);

module.exports = router;
