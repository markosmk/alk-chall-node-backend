const { Router } = require('express');
const router = Router();

const {
  createCharacter,
  getOneCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacters,
} = require('../controllers/characterController');

/**
 * Modelo Esquema de Personajes
 * @typedef {object} Character
 * @property {string} name.required - Nombre personaje
 * @property {integer} age.required - Edad del personaje
 * @property {integer} weight.required - Peso del personaje
 * @property {string} history.required - Resumen de historia
 * @property {string} image.required - Imagen de perfil personaje
 * @property {array<Movie>} movies - Peliculas asociadas
 */

/**
 * GET /api/v1/characters
 * @summary Lista todos los personajes, y permite filtrar por edad, peso, y buscar por nombre o id de pelicula.
 * @tags characters
 * @security Bearer
 * @param {string} name.query - Buscar por nombre de personaje
 * @param {integer} age.query - Filtro por edad de personajes (hasta `num`)
 * @param {integer} weight.query - Filtro por peso de personajes (hasta `num`)
 * @param {string} movies.query - Filtro por `id` de pelicula asociada
 * @return {object} 200 - success response
 */
router.get('/', getCharacters);

/**
 * GET /api/v1/characters/{id}
 * @summary Recibe los detalles de una determinado personaje.
 * @tags characters
 * @security Bearer
 * @param {string} id.path.required - identificador de personaje
 * @return {object} 200 - success response
 */
router.get('/:id', getOneCharacter);

/**
 * POST /api/v1/characters/
 * @summary Crea un nueva personaje.
 * @tags characters
 * @security Bearer
 * @param {object} request.body.required - Datos Necesarios
 * @return {object} 201 - success response
 */
router.post('/', createCharacter);

/**
 * PUT /api/v1/characters/{id}
 * @summary Actualiza datos de un personaje.
 * @tags characters
 * @security Bearer
 * @param {string} id.path.required - identificador de personaje
 * @param {object} request.body.required - Datos Necesarios
 * @return {object} 200 - success response
 */
router.put('/:id', updateCharacter);

/**
 * DELETE /api/v1/characters/{id}
 * @summary Elimina una determinada personaje.
 * @tags characters
 * @security Bearer
 * @param {string} id.path.required - identificador de personaje
 * @return {object} 200 - success response
 */
router.delete('/:id', deleteCharacter);

module.exports = router;
