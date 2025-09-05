const express = require('express');
const router = express.Router();

// Mock data for demo
const mockRaffle = {
  id: 1,
  name: 'Gran Rifa Dorada 2024',
  description: 'Participa y gana el premio de tus sueños',
  total_numbers: 100,
  price_per_number: 25000,
  end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  draw_date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
  status: 'active',
  prize_description: 'iPhone 15 Pro Max + $5,000,000 COP',
  prize_value: 8000000
};

const mockStats = {
  totalRaffles: 15,
  totalWinners: 12,
  totalPrizes: 50000000
};

const mockWinners = [
  {
    name: 'María González',
    winning_number: 77,
    prize_value: 5000000,
    draw_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Carlos Ruiz',
    winning_number: 23,
    prize_value: 3000000,
    draw_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
  }
];

// GET /api/raffles/active
router.get('/active', (req, res) => {
  res.json(mockRaffle);
});

// GET /api/raffles/stats
router.get('/stats', (req, res) => {
  res.json(mockStats);
});

// GET /api/raffles/winners/recent
router.get('/winners/recent', (req, res) => {
  res.json(mockWinners);
});

module.exports = router;