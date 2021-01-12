const models = require('../database/models');
const Sequelize = require('sequelize');

exports.getTransaction = () => models.sequelize.transaction({
  deferrable: Sequelize.Deferrable.SET_DEFERRED,
});