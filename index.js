const express = require('express');
const app = express();
const expressJSDocSwagger = require('express-jsdoc-swagger');
const options = {
  info: {
    version: '1.0.0',
    title: 'Api-Chall-Alkemy',
    description:
      'Api desarrollada para gestionar peliculas y personajes (ambos con relacion), incorporacion de generos, y authenticacion para modificar datos',
  },
  security: {
    Bearer: {
      type: 'http',
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  baseDir: __dirname,
  filesPattern: './src/**/*.js',
  swaggerUIPath: '/docs',
};
expressJSDocSwagger(app)(options);

const config = require('./src/config');
const handleError = require('./src/middlewares/handleError');
const apiRoutes = require('./src/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRoutes);
app.get('*', function (_, res) {
  res.status(404).json({ message: 'Recurso no Encontrado' });
});
app.use(handleError);

app.listen(config.app_port, () => {
  console.log(`🧤 Server en http://${config.app_host}:${config.app_port}/api/v1`);
});
