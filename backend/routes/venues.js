const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'venues route working' });
});

module.exports = router;