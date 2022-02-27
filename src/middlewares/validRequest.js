const { verifyToken } = require('../utils/jwt');

const validRequest = async (req, res, next) => {
  try {
    const auth = req.headers['authorization'];
    const token = auth?.replace('Bearer ', '');
    if (!token) {
      return res.status(403).json({
        message: 'No se puede procesar la solicitud requerida',
        error: 'InvalidToken',
        status: 403,
        data: null,
      });
    }
    const validToken = await verifyToken(token);
    if (validToken) {
      req.user = validToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: error,
      error: 'Unauthorized',
      status: 401,
      data: null,
    });
  }
};

module.exports = validRequest;
