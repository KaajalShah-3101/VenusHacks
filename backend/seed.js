require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/*
Demo venues with realistic accessibility characteristics.
*/
const venues = [
  {
    google_place_id: 'venue-1',
    name: 'Sunrise Cafe',
    address: '123 Main St',
    lat: 33.6846,
    lng: -117.8265
  },
  {
    google_place_id: 'venue-2',
    name: 'Quiet Study Lounge',
    address: '456 Campus Dr',
    lat: 33.6500,
    lng: -117.8400
  },
  {
    google_place_id: 'venue-3',
    name: 'Downtown Pizza',
    address: '789 Market St',
    lat: 33.7000,
    lng: -117.8100
  }
];

/*
Accessibility reviews for those venues.
*/
const reviews = [
  {
    google_place_id: 'venue-1',
    mobility_score: 5,
    noise_score: 4,
    lighting_score: 5,
    seating_score: 4,
    door_width_ok: true,
    has_step: false
  },
  {
    google_place_id: 'venue-1',
    mobility_score: 4,
    noise_score: 5,
    lighting_score: 4,
    seating_score: 5,
    door_width_ok: true,
    has_step: false
  },
  {
    google_place_id: 'venue-2',
    mobility_score: 3,
    noise_score: 5,
    lighting_score: 4,
    seating_score: 5,
    door_width_ok: true,
    has_step: false
  },
  {
    google_place_id: 'venue-3',
    mobility_score: 2,
    noise_score: 2,
    lighting_score: 3,
    seating_score: 4,
    door_width_ok: false,
    has_step: true
  }
];

/*
Main seed function.
*/
async function seed() {

  console.log('Starting seed...');

  /*
  Insert venues first.
  */
  for (const venue of venues) {

    const { error } = await supabase
      .from('venues')
      .upsert(venue);

    if (error) {
      console.error('Venue insert error:', error);
    }

  }

  /*
  Fetch inserted venues so we can map IDs.
  */
  const { data: insertedVenues } = await supabase
    .from('venues')
    .select('id, google_place_id');

  const venueMap = {};

  insertedVenues.forEach((venue) => {
    venueMap[venue.google_place_id] = venue.id;
  });

  /*
  Insert reviews linked to venue IDs.
  */
  for (const review of reviews) {

    const venue_id = venueMap[review.google_place_id];

    const { error } = await supabase
      .from('accessibility_reviews')
      .insert({
        venue_id,
        user_id: null,
        mobility_score: review.mobility_score,
        noise_score: review.noise_score,
        lighting_score: review.lighting_score,
        seating_score: review.seating_score,
        door_width_ok: review.door_width_ok,
        has_step: review.has_step,
        visited_at: new Date().toISOString()
      });

    if (error) {
      console.error('Review insert error:', error);
    }

  }

  console.log('Seed completed.');

}

seed();