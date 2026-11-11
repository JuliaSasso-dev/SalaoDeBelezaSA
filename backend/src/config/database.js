import 'dotenv/config';
import { Sequelize } from 'sequelize';
import pg from 'pg';

const dbName = process.env.DB_NAME || 'sistema_salao';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = String(process.env.DB_PASSWORD || '');
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

async function ensureDatabaseExists() {
  const client = new pg.Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres', 
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Banco de dados "${dbName}" criado com sucesso!`);
    }
  } catch (err) {
    console.error('Erro ao verificar/criar o banco de dados:', err.message);
  } finally {
    await client.end();
  }
}

await ensureDatabaseExists();

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;