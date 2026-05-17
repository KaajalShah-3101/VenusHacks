require('dotenv').config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/*
YOUR ROUTES
*/
const venueRoutes = require('./routes/venues');
const reviewRoutes = require('./routes/reviews');
const matchRoutes = require('./routes/match');

app.use('/venues', venueRoutes);
app.use('/reviews', reviewRoutes);
app.use('/venues', reviewRoutes);
app.use('/venues', matchRoutes);

/*
TEAMMATE ROUTES
*/
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "User created",
      user: data,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/profile", async (req, res) => {
  try {
    const {
      user_id,
      mobility_weight,
      noise_weight,
      lighting_weight,
      seating_weight,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          user_id,
          mobility_weight,
          noise_weight,
          lighting_weight,
          seating_weight,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Profile saved",
      profile: data,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/venues", async (req, res) => {
  try {
    const { q, lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "lat and lng are required" });
    }

    const searchText = q || "restaurant cafe";

    const googleResponse = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: searchText,
        locationBias: {
          circle: {
            center: {
              latitude: Number(lat),
              longitude: Number(lng),
            },
            radius: 5000,
          },
        },
        includedType: "restaurant",
        maxResultCount: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.photos",
        },
      }
    );

    const places = googleResponse.data.places || [];

    const venues = places.map((place) => ({
      google_place_id: place.id,
      name: place.displayName?.text || "Unknown venue",
      address: place.formattedAddress || null,
      lat: place.location?.latitude || null,
      lng: place.location?.longitude || null,
    }));

    for (const venue of venues) {
      await supabase
        .from("venues")
        .upsert(venue, { onConflict: "google_place_id" });
    }

    res.json({
      count: venues.length,
      venues,
    });
  } catch (err) {
    console.error("Google Places error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch venues" });
  }
});

app.get("/venues/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: venue, error: venueError } = await supabase
      .from("venues")
      .select("*")
      .eq("id", id)
      .single();

    if (venueError || !venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    const { data: reviews, error: reviewsError } = await supabase
      .from("accessibility_reviews")
      .select("*")
      .eq("venue_id", id)
      .order("created_at", { ascending: false });

    if (reviewsError) {
      return res.status(400).json({ error: reviewsError.message });
    }

    const avg = (field) => {
      const values = reviews
        .map((review) => review[field])
        .filter((value) => value !== null && value !== undefined);

      if (values.length === 0) return null;

      return values.reduce((sum, value) => sum + value, 0) / values.length;
    };

    res.json({
      venue,
      reviews,
      averages: {
        mobility_score: avg("mobility_score"),
        noise_score: avg("noise_score"),
        lighting_score: avg("lighting_score"),
        seating_score: avg("seating_score"),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      return res.status(400).json({ error: error.message });
    }

    if (!user) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ email }])
        .select()
        .single();

      if (insertError) {
        return res.status(400).json({ error: insertError.message });
      }

      user = newUser;
    }

    res.json({
      message: "Logged in",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/venues/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      mobility_score,
      noise_score,
      lighting_score,
      seating_score,
      door_width_ok,
      has_step,
      visited_at,
      notes,
      user_match_score,
    } = req.body;

    if (
      user_match_score !== undefined &&
      (user_match_score < 0 || user_match_score > 100)
    ) {
      return res.status(400).json({
        error: "user_match_score must be between 0 and 100",
      });
    }

    const { data, error } = await supabase
      .from("accessibility_reviews")
      .insert([
        {
          venue_id: id,
          user_id: user_id || null,
          mobility_score,
          noise_score,
          lighting_score,
          seating_score,
          door_width_ok,
          has_step,
          visited_at,
          notes,
          user_match_score,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Review submitted",
      review: data,
    });
  } catch (err) {
    console.error("Review submit error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});