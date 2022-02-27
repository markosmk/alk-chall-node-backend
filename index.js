const express = require('express');
const app = express();

const config = require('./src/config');
const handleError = require('./src/middlewares/handleError');
const apiRoutes = require('./src/routes');

app.use(express.json());

app.use('/api/v1', apiRoutes);
app.get('*', function (_, res) {
  res.status(404).json({ message: 'Recurso no Encontrado' });
});
app.use(handleError);

app.listen(config.app_port, () => {
  console.log(`🧤 Server en http://${config.app_host}:${config.app_port}/api/v1`);
});
