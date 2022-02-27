const { Router } = require('express');
const router = Router();

const {
  createCharacter,
  getOneCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacters,
} = require('../controllers/characterController');

router.get('/', getCharacters);

// CRUD
router.get('/:id', getOneCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
