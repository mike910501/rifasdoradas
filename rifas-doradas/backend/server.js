const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const authRoutes = require('./routes/auth');
const raffleRoutes = require('./routes/raffles');
const numberRoutes = require('./routes/numbers');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const emailRoutes = require('./routes/email');

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple rate limiting for demo
app.use('/api/', (req, res, next) => {
  // Basic rate limiting placeholder
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/raffles', raffleRoutes);
app.use('/api/numbers', numberRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/email', emailRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('join-raffle', (raffleId) => {
    socket.join(`raffle-${raffleId}`);
    console.log(`Cliente ${socket.id} unido a rifa ${raffleId}`);
  });

  socket.on('number-selected', (data) => {
    io.to(`raffle-${data.raffleId}`).emit('number-update', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🎰 Servidor Rifas Doradas ejecutándose en puerto ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
});