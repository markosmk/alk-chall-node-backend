const { Router } = require('express');
const router = Router();
const { models } = require('../config/sequelize');
const { getIdParam } = require('../utils/getRequest');

/**
 * Modelo de usuario
 * @typedef {object} User
 * @property {string} name.required - Nombre del usuario
 * @property {string} email.required - Email del usuario
 * @property {string} password.required - Password del usuario
 * @property {boolean} isVerified - Comprueba si el email esta verificado
 * @property {string} verifyToken - Token para verificar email o recuperar contraseña
 */

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await models.User.findAll();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/:id', async (req, res, next) => {
  try {
    const id = await getIdParam(req);
    const user = await models.User.findByPk(id);
    if (!user) throw new Error('Usuario no Encontrado');

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
