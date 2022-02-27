const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isEmail: {
      //     msg: 'Must be a valid email address',
      //   },
      // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: {
      //     args: [6],
      //     msg: 'Minimum 6 characters required in last name',
      //   },
      // },
    },
    verifyToken: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return crypto.randomBytes(24).toString('hex');
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  const options = {
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
    ],
    // exclude password in output response
    defaultScope: {
      attributes: { exclude: ['password', 'verifyToken'] },
    },
    // scope to include password
    scopes: {
      withSecretColumns: {
        attributes: { include: ['password', 'verifyToken'] },
      },
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        // if field is empty, not update it
        if (!user.changed('password')) return null;
        if (user.password) {
          const salt = await bcrypt.genSalt(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    // instanceMethods: {
    //   validPassword: (password) => {
    //     return bcrypt.compareSync(password, this.password);
    //   },
    // },
  };

  const userSchema = sequelize.define('User', attributes, options);

  userSchema.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  return userSchema;
};
module.exports = model;
