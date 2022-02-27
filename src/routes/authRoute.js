const { Router } = require('express');
const router = Router();

const {
  login,
  register,
  verifyEmail,
  forgetPass,
  renewPass,
} = require('../controllers/authController');

/**
 * POST /api/v1/auth/login
 * @summary Inicia sesion de usuario
 * @tags auth
 * @param {object} request.body.required - Datos Necesarios
 * @return {object} 200 - success response
 * @example request - example payload
 * {
 *   "email": "email@email.com",
 *   "password": "123456"
 * }
 * @example response - 200 - success response example
 * {
 *   "message": "Ingresado Correctamente",
 *   "user": {},
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 * }
 */
router.post('/login', login);

/**
 * POST /api/v1/auth/register
 * @summary Registra un nuevo usuario
 * @tags auth
 * @param {object} request.body.required - name param description
 * @return {object} 201 - success response
 * @example request - example payload
 * {
 *   "name": "Nombre",
 *   "email": "email@email.com",
 *   "password": "123456"
 * }
 * @example response - 201 - success response example
 * {
 *   "message": "Registrado Correctamente",
 *   "user": {}
 * }
 */
router.post('/register', register);

/**
 * GET /api/v1/auth/verify/{token}
 * @summary Verifica Email de Usuario
 * @tags auth
 * @param {string} token.path - token valido
 * @return {object} 200 - success response
 */
router.get('/verify/:token', verifyEmail);

/**
 * POST /api/v1/auth/forgetpw
 * @summary Registra un nuevo usuario
 * @tags auth
 * @param {object} request.body.required - name param description
 * @return {object} 201 - success response
 */
router.post('/forgetpw', forgetPass);

/**
 * POST /api/v1/auth/lastpw/{token}
 * @summary Registra un nuevo usuario
 * @tags auth
 * @param {object} request.body.required - name param description
 * @return {object} 201 - success response
 */
router.post('/lastpw/:token', renewPass);

module.exports = router;
