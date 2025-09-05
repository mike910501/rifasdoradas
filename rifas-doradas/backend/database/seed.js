const bcrypt = require('bcryptjs');
const { query } = require('./config');

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando datos iniciales...');

    // Crear usuario administrador
    const adminPassword = await bcrypt.hash('Admin@2024', 10);
    
    await query(`
      INSERT INTO users (name, email, password, role, is_active, email_verified) 
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
    `, ['Administrador', 'admin@rifasdoradas.com', adminPassword, 'super_admin', true, true]);

    // Crear rifa de ejemplo
    const raffleResult = await query(`
      INSERT INTO raffles (
        name, 
        description, 
        total_numbers, 
        price_per_number, 
        end_date, 
        draw_date, 
        status, 
        prize_description, 
        prize_value,
        created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT id FROM users WHERE email = 'admin@rifasdoradas.com'))
      ON CONFLICT DO NOTHING
      RETURNING id
    `, [
      'Gran Rifa Dorada 2024',
      'Participa y gana el premio de tus sueños',
      100,
      25000,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días desde hoy
      new Date(Date.now() + 32 * 24 * 60 * 60 * 1000), // 32 días desde hoy
      'active',
      'iPhone 15 Pro Max + $5,000,000 COP',
      8000000
    ]);

    if (raffleResult.rows.length > 0) {
      const raffleId = raffleResult.rows[0].id;
      
      // Crear números para la rifa
      const numberInserts = [];
      for (let i = 1; i <= 100; i++) {
        numberInserts.push(`(${raffleId}, ${i}, 'disponible')`);
      }
      
      await query(`
        INSERT INTO numbers (raffle_id, number, status) 
        VALUES ${numberInserts.join(', ')}
        ON CONFLICT (raffle_id, number) DO NOTHING
      `);
    }

    console.log('✅ Datos iniciales creados:');
    console.log('👤 Admin: admin@rifasdoradas.com / Admin@2024');
    console.log('🎰 Rifa de ejemplo creada');
    console.log('🔢 100 números disponibles');

  } catch (error) {
    console.error('❌ Error creando datos iniciales:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = seedDatabase;