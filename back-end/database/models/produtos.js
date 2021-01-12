module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define('produtos',{
    id_produto: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false,
    },
    nome:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    valor:{
      type: DataTypes.FLOAT,
      allowNull:false,
    },
    data_compra: {
      type: DataTypes.DATE,
      allowNull: true,
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

  produtos.associate = (models) => {
    produtos.hasOne(models.compras, {
      as: 'produto',
      foreignKey: 'id_produto',
    });
  };

  return produtos;
}