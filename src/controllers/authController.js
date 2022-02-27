const { models } = require('../config/sequelize.js');
const { createToken } = require('../utils/jwt.js');
const crypto = require('crypto');

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Email y password son requeridos');

    // 1 check if email exists
    const user = await models.User.scope('withSecretColumns').findOne({
      where: { email: email },
    });
    if (!user) throw new Error('No se encontro usuario con ese email', 401);

    // 2 check password with method in instance model user "validPassword"
    const password_valid = await user.validPassword(password, user.dataValues.password);
    if (!password_valid) throw new Error('No coincide el pass', 401);

    // 3 create token to front session
    const token = await createToken({ id: user.id, email: user.email });

    // 4 check values to response
    res.status(200).json({ message: 'Ingresado Correctamente', user, token });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) throw new Error('Todos los campos son requeridos');
    // 1 Check if user exists with your email
    // const user = await models.User.findOne({ where: { email: email } });
    // if (user) throw new Error('Ya existe un usuario con ese email');
    // This verification is solved by the model when having unique the email
    // 2 Hash password with Hooks beforeCreate in model User
    // 3 Create user in Db
    const dataUser = {
      name,
      email,
      password,
    };
    const user = await models.User.create(dataUser);

    // TODO: send welcome email with SendGrid

    res.status(201).json({ message: 'Registrado Correctamente', user });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { token } = req.params;
  try {
    if (!token) throw new Error('No token proporcionado');
    const verifyUser = await models.User.findOne({ where: { verifyToken: token } });
    if (!verifyUser) throw new Error('Usuario no encontrado');

    verifyUser.verifyToken = null;
    verifyUser.isVerified = true;
    await verifyUser.save();

    res.json({ message: 'Cuenta/Email Verificado', user: verifyUser });
  } catch (error) {
    next(error);
  }
};

// TODO: check limit requests
const forgetPass = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error('Es necesario el mail de tu cuenta');

    const user = await models.User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    user.verifyToken = crypto.randomBytes(24).toString('hex');
    await user.save();

    // TODO: send email with url and token

    res.json({
      message: 'Enviamos un mail con las instrucciones para recuperar tu cuenta',
      user,
    });
  } catch (error) {
    next(error);
  }
};

const renewPass = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Todos los datos son requeridos');

    const { token } = req.params;
    if (!token) throw new Error('No token proporcionado');

    const user = await models.User.findOne({
      where: { verifyToken: token, email: email },
    });
    if (!user) throw new Error('Usuario no encontrado');

    user.password = password;
    user.verifyToken = null;
    await user.save();
    // or await user.update({ verifyToken: null, password });

    res.json({ message: 'Tu Contraseña ha sido actualizada', user });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, verifyEmail, forgetPass, renewPass };
