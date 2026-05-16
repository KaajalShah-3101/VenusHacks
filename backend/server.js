require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const venueRoutes = require('./routes/venues');
const reviewRoutes = require('./routes/reviews');
const matchRoutes = require('./routes/match');

app.use('/venues', venueRoutes);
app.use('/reviews', reviewRoutes);
app.use('/venues', reviewRoutes);
app.use('/venues', matchRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});