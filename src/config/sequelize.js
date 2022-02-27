const Sequelize = require('sequelize');
const { db } = require('./index');
const { applyExtraOptions } = require('./applyExtraOptions');

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

// all Models
const modelDefiners = [
  require('../models/userModel'),
  require('../models/movieModel'),
  require('../models/characterModel'),
  require('../models/genderModel'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
// Apply additional options ex: associations
applyExtraOptions(sequelize);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    // create mock if sync -> force is true
    console.log('✅ Conexion Exitosa!.');
  } catch (error) {
    console.error('Error al momento de conectar la BD:', error);
  }
})();

module.exports = sequelize;
