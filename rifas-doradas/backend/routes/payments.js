const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Payment processed - Demo' });
});

module.exports = router;