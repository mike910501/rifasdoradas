const express = require('express');
const router = express.Router();

router.post('/send', (req, res) => {
  res.json({ message: 'Email sent - Demo' });
});

module.exports = router;