const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

/*
Connect to Supabase database.
*/
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/*
GET /venues/:placeId/match?userId=...

Purpose:
Calculate how well a venue matches a user's accessibility needs.
*/
router.get('/:placeId/match', async (req, res) => {
  const { placeId } = req.params;
  const { userId } = req.query;

  try {

    /*
    STEP 1:
    Fetch the user's accessibility preference weights.
    */
    const { data: profile } = await supabase
      .from('user_profiles')
      .select(`
        mobility_weight,
        noise_weight,
        lighting_weight,
        seating_weight
      `)
      .eq('user_id', userId)
      .single();

    if (!profile) {
      return res.status(404).json({
        error: 'User profile not found'
      });
    }

    /*
    STEP 2:
    Find venue by Google place ID.
    */
    const { data: venue } = await supabase
      .from('venues')
      .select('id')
      .eq('google_place_id', placeId)
      .single();

    if (!venue) {
      return res.json({
        match_score: null,
        message: 'No venue found'
      });
    }

    /*
    STEP 3:
    Fetch all reviews for that venue.
    */
    const { data: reviews } = await supabase
      .from('accessibility_reviews')
      .select(`
        mobility_score,
        noise_score,
        lighting_score,
        seating_score
      `)
      .eq('venue_id', venue.id);

    if (!reviews || reviews.length === 0) {
      return res.json({
        match_score: null,
        message: 'No reviews yet'
      });
    }

    /*
    STEP 4:
    Calculate average review scores.
    */
    const avg = (field) => {
      const values = reviews
        .map((review) => review[field])
        .filter((value) => value !== null);

      if (values.length === 0) return null;

      const total = values.reduce((sum, value) => sum + value, 0);

      return total / values.length;
    };

    const venueAverage = {
      mobility: avg('mobility_score'),
      noise: avg('noise_score'),
      lighting: avg('lighting_score'),
      seating: avg('seating_score')
    };

    /*
    STEP 5:
    Weighted match score calculation.
    */
    const dimensions = [
      {
        weight: profile.mobility_weight,
        score: venueAverage.mobility
      },
      {
        weight: profile.noise_weight,
        score: venueAverage.noise
      },
      {
        weight: profile.lighting_weight,
        score: venueAverage.lighting
      },
      {
        weight: profile.seating_weight,
        score: venueAverage.seating
      }
    ].filter((dimension) => (
      dimension.weight > 0 &&
      dimension.score !== null
    ));

    if (dimensions.length === 0) {
      return res.json({
        match_score: 100,
        message: 'No accessibility preferences set'
      });
    }

    const totalWeight = dimensions.reduce(
      (sum, dimension) => sum + dimension.weight,
      0
    );

    const weightedSum = dimensions.reduce((sum, dimension) => {

      /*
      Convert 1–5 review score into 0–1 scale.
      */
      const normalizedScore =
        (dimension.score - 1) / 4;

      return (
        sum +
        dimension.weight * normalizedScore
      );

    }, 0);

    const match_score = Math.round(
      (weightedSum / totalWeight) * 100
    );

    /*
    STEP 6:
    Return result.
    */
    res.json({
      match_score,
      breakdown: venueAverage,
      review_count: reviews.length
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Match score calculation failed'
    });

  }
});

module.exports = router;