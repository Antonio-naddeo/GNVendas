module.exports = (sequelize, DataTypes) => {
  const compradores = sequelize.define('compradores',{
    id_comprador: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false,
    },
    nome:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    cpf:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    telefone:{
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

  compradores.associate = (models) => {
    compradores.hasOne(models.compras, {
      as: 'comprador',
      foreignKey: 'id_comprador',
    });
  };

  return compradores;
}