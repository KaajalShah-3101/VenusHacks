const express = require('express');
const router = express.Router();

router.get('/:placeId/reviews', (req, res) => {
  res.json({ message: 'reviews route working' });
});

module.exports = router;