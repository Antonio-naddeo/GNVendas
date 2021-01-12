'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('produtos',{
        id_produto: {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
          allowNull: false,
        },
        nome:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        valor:{
          type: Sequelize.FLOAT,
          allowNull:false,
        },
        data_compra: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
      },{transaction});

      await queryInterface.createTable('compradores',{
        id_comprador: {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
          allowNull: false,
        },
        nome:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        cpf:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        telefone:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
      },{transaction});

      await queryInterface.createTable('compras',{
        id_compra: {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
          allowNull: false,
        },
        id_comprador:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        id_produto:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        id_boleto:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        link_boleto:{
          type: Sequelize.STRING,
          allowNull:false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
      },{transaction});

      await queryInterface.addConstraint('compras', {
        fields: ['id_comprador'],
        type: 'foreign key',
        name: 'fk_compras_id_comprador',
        references: {
          table: 'compradores',
          field: 'id_comprador',
        },
        transaction,
      });

      await queryInterface.addConstraint('compras', {
        fields: ['id_produto'],
        type: 'foreign key',
        name: 'fk_compras_id_produto',
        references: {
          table: 'produtos',
          field: 'id_produto',
        },
        transaction,
      });

      
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint('compras','fk_compras_id_produto',{transaction});
      await queryInterface.removeConstraint('compras','fk_compras_id_comprador',{transaction});

      await queryInterface.dropTable('compras',{transaction});
      await queryInterface.dropTable('comprador',{transaction});
      await queryInterface.dropTable('produtos',{transaction});
      
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
};
