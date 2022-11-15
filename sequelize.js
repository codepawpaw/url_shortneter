/* eslint-disable new-cap */
const Sequelize = require('sequelize');

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = require('./config');

const ShortenUrlModel = require('./model/shorten_url');

console.log('INIT SEQUELIZE');
let sequelize = null;

sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: 'mysql',
  host: DATABASE_HOST,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

const ShortenUrl = ShortenUrlModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  ShortenUrl
};
