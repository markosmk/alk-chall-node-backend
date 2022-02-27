const { Router } = require('express');
const router = Router();

const {
  getOneMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

router.get('/', getMovies);
// CRUD
router.get('/:id', getOneMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
