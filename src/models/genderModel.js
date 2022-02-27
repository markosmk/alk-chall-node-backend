const { DataTypes } = require('sequelize');

const model = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define('Gender', attributes, options);
};

module.exports = model;
