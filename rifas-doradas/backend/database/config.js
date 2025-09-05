const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = isProduction 
  ? process.env.DATABASE_URL_RAILWAY 
  : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
  console.error('Error inesperado en cliente inactivo', err);
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Consulta ejecutada', { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Error en consulta:', error);
    throw error;
  }
};

const getClient = async () => {
  const client = await pool.connect();
  const query = client.query.bind(client);
  const release = () => client.release();
  
  const timeout = setTimeout(() => {
    console.error('Un cliente fue verificado por más de 5 segundos');
    console.trace();
  }, 5000);
  
  return {
    query,
    release: () => {
      clearTimeout(timeout);
      client.release();
    }
  };
};

module.exports = {
  query,
  getClient,
  pool
};