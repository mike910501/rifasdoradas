-- Rifas Doradas Database Schema
-- Sistema completo de rifas y sorteos

-- Eliminar tablas si existen
DROP TABLE IF EXISTS email_logs CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS numbers CASCADE;
DROP TABLE IF EXISTS raffles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Crear tipos personalizados
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS raffle_status CASCADE;
DROP TYPE IF EXISTS number_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;

CREATE TYPE user_role AS ENUM ('user', 'moderator', 'verificador', 'admin', 'super_admin');
CREATE TYPE raffle_status AS ENUM ('draft', 'active', 'finished', 'cancelled');
CREATE TYPE number_status AS ENUM ('disponible', 'seleccionado', 'pendiente', 'vendido');
CREATE TYPE payment_status AS ENUM ('pending', 'approved', 'rejected', 'expired');
CREATE TYPE payment_method AS ENUM ('pago_movil', 'nequi', 'zelle');

-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expire TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP
);

-- Tabla de rifas
CREATE TABLE raffles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    total_numbers INT DEFAULT 100,
    price_per_number DECIMAL(10, 2) NOT NULL DEFAULT 25000,
    currency VARCHAR(3) DEFAULT 'COP',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL,
    draw_date TIMESTAMP,
    status raffle_status DEFAULT 'draft',
    prize_description TEXT,
    prize_value DECIMAL(12, 2),
    winner_number INT,
    winner_user_id INT REFERENCES users(id),
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rules TEXT,
    min_numbers_to_activate INT DEFAULT 1,
    max_numbers_per_user INT DEFAULT 10,
    featured BOOLEAN DEFAULT false,
    sold_count INT DEFAULT 0,
    revenue DECIMAL(12, 2) DEFAULT 0
);

-- Tabla de números
CREATE TABLE numbers (
    id SERIAL PRIMARY KEY,
    raffle_id INT NOT NULL REFERENCES raffles(id) ON DELETE CASCADE,
    number INT NOT NULL,
    status number_status DEFAULT 'disponible',
    user_id INT REFERENCES users(id),
    reserved_by INT REFERENCES users(id),
    reserved_until TIMESTAMP,
    sold_at TIMESTAMP,
    payment_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(raffle_id, number)
);

-- Tabla de pagos
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    raffle_id INT NOT NULL REFERENCES raffles(id),
    numbers TEXT[] NOT NULL,
    method payment_method NOT NULL,
    reference VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    receipt_url VARCHAR(500),
    status payment_status DEFAULT 'pending',
    admin_comment TEXT,
    verified_by INT REFERENCES users(id),
    verified_at TIMESTAMP,
    user_name VARCHAR(100),
    user_phone VARCHAR(20),
    user_email VARCHAR(100),
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- Tabla de logs de emails
CREATE TABLE email_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    payment_id INT REFERENCES payments(id),
    email_type VARCHAR(50) NOT NULL,
    recipient VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    template_used VARCHAR(100),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'sent',
    error_message TEXT,
    metadata JSONB
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_raffles_status ON raffles(status);
CREATE INDEX idx_raffles_end_date ON raffles(end_date);
CREATE INDEX idx_numbers_raffle_status ON numbers(raffle_id, status);
CREATE INDEX idx_numbers_user ON numbers(user_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_raffle ON payments(raffle_id);
CREATE INDEX idx_email_logs_user ON email_logs(user_id);
CREATE INDEX idx_email_logs_payment ON email_logs(payment_id);

-- Triggers para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_raffles_updated_at BEFORE UPDATE ON raffles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_numbers_updated_at BEFORE UPDATE ON numbers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para limpiar números reservados expirados
CREATE OR REPLACE FUNCTION clean_expired_reservations()
RETURNS void AS $$
BEGIN
    UPDATE numbers 
    SET status = 'disponible', 
        reserved_by = NULL, 
        reserved_until = NULL
    WHERE status = 'seleccionado' 
    AND reserved_until < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Función para calcular estadísticas de rifa
CREATE OR REPLACE FUNCTION calculate_raffle_stats(raffle_id_param INT)
RETURNS TABLE(
    total_sold INT,
    total_revenue DECIMAL,
    total_pending INT,
    total_available INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(CASE WHEN status = 'vendido' THEN 1 END)::INT as total_sold,
        COUNT(CASE WHEN status = 'vendido' THEN 1 END) * r.price_per_number as total_revenue,
        COUNT(CASE WHEN status = 'pendiente' THEN 1 END)::INT as total_pending,
        COUNT(CASE WHEN status = 'disponible' THEN 1 END)::INT as total_available
    FROM numbers n
    JOIN raffles r ON r.id = n.raffle_id
    WHERE n.raffle_id = raffle_id_param
    GROUP BY r.price_per_number;
END;
$$ LANGUAGE plpgsql;