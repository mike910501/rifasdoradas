const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard - Demo' });
});

module.exports = router;