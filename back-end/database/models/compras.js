module.exports = (sequelize, DataTypes) => {
  const compras = sequelize.define('compras',{
    id_compra: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false,
    },
    id_comprador:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    id_produto:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    id_boleto:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    link_boleto:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  compras.associate = (models) => {
    compras.belongsTo(models.compradores, {
      as: 'comprador',
      foreignKey: 'id_comprador',
    });

    compras.belongsTo(models.produtos, {
      as: 'produto',
      foreignKey: 'id_produto',
    });
  };

  return compras;
}