'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    publisher: DataTypes.STRING,
    year: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};