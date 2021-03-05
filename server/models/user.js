'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/password-helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    getFullName() {
      return `${this.first_name} ${this.last_name}`;
    }

    static associate(models) {
      // define association here

      User.hasMany(models.Todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name is required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Must be in email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [6, 16],
          msg: 'Password length must be between 6 to 16 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        if (!instance.last_name) {
          instance.last_name = instance.first_name;
        }
        
        instance.password = hashPassword(instance.password);
      },
      beforeUpdate(instance, options) {
        if (!instance.last_name) {
          instance.last_name = instance.first_name;
        }
        
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return User;
};