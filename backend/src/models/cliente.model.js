import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Cliente;