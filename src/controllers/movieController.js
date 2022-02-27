const {
  models,
  Sequelize: { Op },
} = require('../config/sequelize');
const { getIdParam } = require('../utils/getRequest');
// const {Op} = require('sequelize');

const getMovies = async (req, res, next) => {
  const { name, genre, order } = req.query;
  let options = { attributes: ['name', 'image', 'dateCreated'], where: {} };
  if (name || genre || order) {
    if (name) options.where.name = { [Op.like]: `%${name}%` };
    if (order) options.order = [['dateCreated', order]];
    if (genre) options.where.GenderID = Number(genre);
  }

  try {
    const movies = await models.Movie.findAll(options);
    res.json({ movies });
  } catch (error) {
    next(error);
  }
};

const getOneMovie = async (req, res, next) => {
  try {
    const id = await getIdParam(req);
    const movie = await models.Movie.findByPk(id, {
      include: ['Characters'],
    });
    if (!movie) throw new Error('Item no encontrado');
    res.json({ movie });
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const data = req.body;
    const movie = await models.Movie.create(data);
    res.status(201).json({ message: 'Creado Correctamente', movie });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const data = req.body;
    const id = await getIdParam(req);
    const movie = await models.Movie.findByPk(id);
    if (!movie) throw new Error('Item no encontrado');
    Object.assign(movie, data);
    await movie.save();
    res.json({ message: 'Actualizado Correctamente', movie });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const id = await getIdParam(req);
    const movie = await models.Movie.findByPk(id);
    if (!movie) throw new Error('Item no encontrado');
    await movie.destroy();
    res.json({ message: 'Eliminado Correctamente', movie });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMovies, getOneMovie, createMovie, updateMovie, deleteMovie };
