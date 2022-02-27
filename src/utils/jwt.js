const { sign, verify } = require('jsonwebtoken');
const { jwt_secret } = require('../config');

const createToken = ({ email, id }, expiresIn = 60 * 60) => {
  return new Promise((resolve, reject) => {
    if (!email || !id) return reject('datos invalidos');

    return sign(
      { email, id },
      jwt_secret,
      {
        // algorithm: 'RS256', //2024bit
        expiresIn,
      },
      (err, token) => {
        if (err) return reject('token invalido');
        resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) return reject('token invalido');

    verify(
      token,
      jwt_secret,
      {
        // algorithm: 'RS256', //2024bit
      },
      (err, decode) => {
        if (err) return reject('tu sesion ha expirado, volve a ingresar');
        resolve(decode); // return data decode
      }
    );
  });
};

module.exports = { createToken, verifyToken };
