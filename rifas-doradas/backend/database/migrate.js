const fs = require('fs');
const path = require('path');
const { pool } = require('./config');

async function runMigrations() {
  try {
    console.log('🔄 Iniciando migraciones...');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📋 Ejecutando esquema de base de datos...');
    await pool.query(schema);
    
    console.log('✅ Migraciones completadas exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en migraciones:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;