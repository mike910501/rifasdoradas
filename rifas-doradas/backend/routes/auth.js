const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../database/config');
const { sendEmail } = require('../services/emailService');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

router.post('/register', [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('phone').notEmpty().withMessage('El teléfono es requerido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(2, 15);

    const result = await query(
      `INSERT INTO users (name, email, phone, password, verification_token) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role`,
      [name, email, phone, hashedPassword, verificationToken]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    await sendEmail({
      to: email,
      subject: 'Bienvenido a Rifas Doradas',
      template: 'welcome',
      data: { name, verificationToken }
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const result = await query(
      'SELECT id, name, email, password, role, is_active, locked_until FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({ message: 'Cuenta desactivada' });
    }

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(403).json({ message: 'Cuenta bloqueada temporalmente' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      await query(
        'UPDATE users SET login_attempts = login_attempts + 1 WHERE id = $1',
        [user.id]
      );
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    await query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP, login_attempts = 0 WHERE id = $1',
      [user.id]
    );

    const token = generateToken(user);

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

router.post('/verify-email', async (req, res) => {
  try {
    const { email, token } = req.body;

    const result = await query(
      'UPDATE users SET email_verified = true, verification_token = NULL WHERE email = $1 AND verification_token = $2 RETURNING id',
      [email, token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    res.json({ message: 'Email verificado exitosamente' });
  } catch (error) {
    console.error('Error verificando email:', error);
    res.status(500).json({ message: 'Error al verificar email' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetExpire = new Date(Date.now() + 3600000);

    const result = await query(
      'UPDATE users SET reset_token = $1, reset_token_expire = $2 WHERE email = $3 RETURNING name',
      [resetToken, resetExpire, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email no registrado' });
    }

    await sendEmail({
      to: email,
      subject: 'Restablecer contraseña - Rifas Doradas',
      template: 'reset-password',
      data: { name: result.rows[0].name, resetToken }
    });

    res.json({ message: 'Email de recuperación enviado' });
  } catch (error) {
    console.error('Error en forgot password:', error);
    res.status(500).json({ message: 'Error al procesar solicitud' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const result = await query(
      'SELECT id FROM users WHERE email = $1 AND reset_token = $2 AND reset_token_expire > CURRENT_TIMESTAMP',
      [email, token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query(
      'UPDATE users SET password = $1, reset_token = NULL, reset_token_expire = NULL WHERE id = $2',
      [hashedPassword, result.rows[0].id]
    );

    res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error al restablecer contraseña' });
  }
});

module.exports = router;