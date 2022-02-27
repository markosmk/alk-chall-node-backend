const { Router } = require('express');
const router = Router();

const {
  login,
  register,
  verifyEmail,
  forgetPass,
  renewPass,
} = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/forgetpw', forgetPass);
router.post('/lastpw/:token', renewPass);

module.exports = router;
