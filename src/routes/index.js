const { Router } = require('express');
const router = Router();

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const characterRoute = require('./characterRoute');
const movieRoute = require('./movieRoute');

const validRequest = require('../middlewares/validRequest');

router.use('/auth', authRoute);
router.use('/user', validRequest, userRoute);
router.use('/characters', validRequest, characterRoute);
router.use('/movies', validRequest, movieRoute);

module.exports = router;
