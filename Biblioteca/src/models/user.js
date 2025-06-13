const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('utilizador', {
  numeroDeUtilizador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  nome: { type: DataTypes.STRING(255), allowNull: false },
  contacto: { type: DataTypes.STRING(100), allowNull: false },
  tipo: { type: DataTypes.ENUM('aluno','professor','funcionario'), allowNull: false },
});

module.exports = User;
