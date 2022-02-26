const express = require('express');
const app = express();

const handleError = require('./src/middlewares/handleError');
const apiRoutes = require('./src/routes');

app.use('/api/v1', apiRoutes);
app.get('*', function (_, res) {
  res.status(404).json({ message: 'Recurso no Encontrado' });
});
app.use(handleError);

app.listen(8085, () => {
  console.log(`🧤 Server en http://localhost:8085/api/v1`);
});
