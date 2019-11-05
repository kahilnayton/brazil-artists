// inside models.js
const Sequelize = require('sequelize');

// Create a variable that is a connection to the database.
const sequelize = new Sequelize({
  database: 'characters_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

class Character extends Sequelize.Model { }

Character.init({
  name: Sequelize.STRING,
  image_url: Sequelize.STRING,
  fun_fact: Sequelize.TEXT,
  quote: Sequelize.TEXT
}, {
  sequelize,
  modelName: 'character'
});

module.exports = {
  Character,
  sequelize
};