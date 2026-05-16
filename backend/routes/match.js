const express = require('express');
const router = express.Router();

router.get('/:placeId/match', (req, res) => {
  res.json({ message: 'match route working' });
});

module.exports = router;