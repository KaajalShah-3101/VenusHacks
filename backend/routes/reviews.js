const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

/*
This connects this route file to Supabase.

Supabase is your database.
We need this because reviews have to be saved and fetched from tables.
*/
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/*
POST /reviews

Purpose:
Save a new accessibility review into the database.

The frontend will send review data like:
{
  google_place_id,
  user_id,
  mobility_score,
  noise_score,
  lighting_score,
  seating_score,
  door_width_ok,
  has_step
}
*/
router.post('/', async (req, res) => {
  const {
        google_place_id,
        name,
        address,
        lat,
        lng,
        user_id,
        mobility_score,
        noise_score,
        lighting_score,
        seating_score,
        door_width_ok,
        has_step,
        visited_at
    } = req.body;
  try {
    /*
    First, check if this venue already exists in our venues table.
    Reviews need a venue_id, not just a Google place ID.
    */
    const { data: existingVenue } = await supabase
      .from('venues')
      .select('id')
      .eq('google_place_id', google_place_id)
      .single();

    let venue_id = existingVenue?.id;

    /*
    If the venue does not exist yet, insert it.
    This prevents reviews from pointing to a missing venue.
    */
    if (!venue_id) {
      const { data: newVenue, error: venueError } = await supabase
        .from('venues')
        .insert({
                    google_place_id,
                    name: name || 'Unknown Venue',
                    address: address || null,
                    lat: lat || null,
                    lng: lng || null,
                })
        .select('id')
        .single();

      if (venueError) throw venueError;

      venue_id = newVenue.id;
    }

    /*
    Now insert the actual review.
    */
    const { data, error } = await supabase
      .from('accessibility_reviews')
      .insert({
        venue_id,
        user_id,
        mobility_score,
        noise_score,
        lighting_score,
        seating_score,
        door_width_ok,
        has_step,
        visited_at: visited_at || new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ review: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Review submission failed' });
  }
});

/*
GET /venues/:placeId/reviews

Purpose:
Fetch all reviews for one venue.
Also calculate average scores for that venue.
*/
router.get('/:placeId/reviews', async (req, res) => {
  const { placeId } = req.params;

  try {
    /*
    Convert Google place ID into our internal venue ID.
    */
    const { data: venue } = await supabase
      .from('venues')
      .select('id')
      .eq('google_place_id', placeId)
      .single();

    if (!venue) {
      return res.json({ reviews: [], averages: null });
    }

    /*
    Fetch all reviews connected to that venue.
    */
    const { data: reviews, error } = await supabase
      .from('accessibility_reviews')
      .select('*')
      .eq('venue_id', venue.id)
      .order('visited_at', { ascending: false });

    if (error) throw error;

    /*
    Helper function to average review scores.
    */
    const avg = (field) => {
      const values = reviews
        .map((review) => review[field])
        .filter((value) => value !== null && value !== undefined);

      if (values.length === 0) return null;

      const total = values.reduce((sum, value) => sum + value, 0);
      return Number((total / values.length).toFixed(1));
    };

    const averages = {
      mobility_score: avg('mobility_score'),
      noise_score: avg('noise_score'),
      lighting_score: avg('lighting_score'),
      seating_score: avg('seating_score'),
      review_count: reviews.length
    };

    res.json({ reviews, averages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch reviews' });
  }
});

module.exports = router;