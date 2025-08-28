const express = require('express');
const router = express.Router();

// Example POST /api/auth/register
router.post('/register', (req, res) => {
  res.status(200).json({ message: 'User registered (mock)' });
});

module.exports = router;
