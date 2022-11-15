/* eslint-disable new-cap */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('shorten_url', {
      original_url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      modified_url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    }, {
      sequelize,
      modelName: 'shorten_url',
      tableName: 'shorten_url',
    });
};
  