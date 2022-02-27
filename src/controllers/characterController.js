const {
  models,
  Sequelize: { Op },
} = require('../config/sequelize');
const { getIdParam } = require('../utils/getRequest');

const getCharacters = async (req, res, next) => {
  // 1) handle querys options
  const { name, age, weight, movies } = req.query;
  let options = { attributes: ['image', 'name'], where: {} };
  if (name || age || weight || movies) {
    if (name) options.where.name = { [Op.like]: `%${name}%` };
    if (age) options.where.age = { [Op.lte]: Number(age) };
    if (weight) options.where.weight = { [Op.lte]: Number(weight) };
    if (movies)
      options.include = [
        {
          model: models.Movie,
          where: { id: Number(movies) },
        },
      ];
  }
  try {
    // 2) find with optional querys
    const characters = await models.Character.findAll(options);
    res.json({ characters });
  } catch (error) {
    next(error);
  }
};

// includes asociation movies related
const getOneCharacter = async (req, res, next) => {
  try {
    const id = await getIdParam(req);
    const character = await models.Character.findByPk(id, {
      include: ['Movies'],
    });
    if (!character) throw new Error('Item no encontrado');
    res.json({ character });
  } catch (error) {
    next(error);
  }
};

const createCharacter = async (req, res, next) => {
  try {
    const data = req.body;
    const newCharacter = await models.Character.create(data);
    res.status(201).json({ message: 'Creado Correctamente', character: newCharacter });
  } catch (error) {
    next(error);
  }
};

const updateCharacter = async (req, res, next) => {
  try {
    const data = req.body;
    const id = await getIdParam(req);
    const character = await models.Character.findByPk(id);
    if (!character) throw new Error('Item no encontrado');
    Object.assign(character, data);
    await character.save();

    res.json({ message: 'Actualizado Correctamente', character });
  } catch (error) {
    next(error);
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const id = await getIdParam(req);
    const character = await models.Character.findByPk(id);
    if (!character) throw new Error('Item no encontrado');
    await character.destroy();
    res.json({ message: 'Eliminado Correctamente', character });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCharacters,
  getOneCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
