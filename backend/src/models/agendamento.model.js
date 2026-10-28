import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    servico: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Agendamento;