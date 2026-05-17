# AccessMap Backend API

Base URL:

```txt
http://localhost:5001
```

---

# Submit Accessibility Review

## POST /reviews

Creates a new accessibility review for a venue.

## Request Body

```json
{
  "google_place_id": "venue-1",
  "name": "Sunrise Cafe",
  "address": "123 Main St",
  "lat": 33.6846,
  "lng": -117.8265,
  "user_id": null,
  "mobility_score": 5,
  "noise_score": 4,
  "lighting_score": 5,
  "seating_score": 4,
  "door_width_ok": true,
  "has_step": false
}
```

## Example Response

```json
{
  "review": {
    "id": "uuid",
    "venue_id": "uuid",
    "mobility_score": 5
  }
}
```

---

# Get Venue Reviews

## GET /venues/:placeId/reviews

Fetches all accessibility reviews for a venue.

## Example Request

```txt
GET /venues/venue-1/reviews
```

## Example Response

```json
{
  "reviews": [],
  "averages": {
    "mobility_score": 4.5,
    "noise_score": 4.5,
    "lighting_score": 4.5,
    "seating_score": 4.5,
    "review_count": 2
  }
}
```

---

# Get Accessibility Match Score

## GET /venues/:placeId/match?userId=...

Calculates personalized accessibility compatibility.

## Example Request

```txt
GET /venues/venue-1/match?userId=bd244535-1c2d-409d-8dc5-bfce7ceb9e80
```

## Example Response

```json
{
  "match_score": 88,
  "breakdown": {
    "mobility": 4.5,
    "noise": 4.5,
    "lighting": 4.5,
    "seating": 4.5
  },
  "review_count": 2
}
```

---

# Notes

- All responses are JSON.
- Match scores are calculated from weighted user accessibility preferences.
- Review scores use a 1–5 scale.
- Seed data can be inserted with:

```bash
node seed.js
```