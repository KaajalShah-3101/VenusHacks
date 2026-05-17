const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  signup: (email) =>
    request('/signup', { method: 'POST', body: JSON.stringify({ email }) }),

  login: (email) =>
    request('/login', { method: 'POST', body: JSON.stringify({ email }) }),

  saveProfile: (profile) =>
    request('/profile', { method: 'POST', body: JSON.stringify(profile) }),

  searchVenues: ({ q, lat, lng }) => {
    const params = new URLSearchParams({ lat: String(lat), lng: String(lng) });
    if (q) params.set('q', q);
    return request(`/venues?${params}`);
  },

  getVenueReviews: (placeId) => request(`/venues/${placeId}/reviews`),

  getMatchScore: (placeId, userId) =>
    request(`/venues/${placeId}/match?userId=${encodeURIComponent(userId)}`),

  submitReview: (body) =>
    request('/reviews', { method: 'POST', body: JSON.stringify(body) }),
};

export const DEMO_VENUES = [
  {
    google_place_id: 'venue-1',
    name: 'Sunrise Cafe',
    address: '123 Main St',
    lat: 33.6846,
    lng: -117.8265,
  },
  {
    google_place_id: 'venue-2',
    name: 'Quiet Study Lounge',
    address: '456 Campus Dr',
    lat: 33.65,
    lng: -117.84,
  },
  {
    google_place_id: 'venue-3',
    name: 'Downtown Pizza',
    address: '789 Market St',
    lat: 33.7,
    lng: -117.81,
  },
];
