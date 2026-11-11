import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './src/config/database.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log(' Conexão com o banco de dados estabelecida e modelos sincronizados.');
        app.listen(PORT, () => {
            console.log(` Servidor rodando na porta ${PORT}`);
            console.log(` Acesse em: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(' Erro ao conectar ou sincronizar o banco de dados:', error);
    });