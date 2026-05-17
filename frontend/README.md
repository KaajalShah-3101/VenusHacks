# AccessMap Frontend

React + Tailwind UI for accessibility-first venue discovery.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` to your backend (default `http://localhost:5001`). Start the backend first.

## Demo flow

1. Sign in with any email (`POST /login` on backend).
2. Complete onboarding (saves profile via `POST /profile`).
3. Open **Demo venues** on search — seeded as `venue-1`, `venue-2`, `venue-3`.
4. Run `node seed.js` in `backend/` before demo so match scores appear.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Email sign-in |
| `/onboarding` | 4-step accessibility weights |
| `/search` | Venue search + demo list |
| `/venue/:placeId` | Detail, ratings, match % |
| `/venue/:placeId/review` | Submit review (`POST /reviews`) |
| `/profile` | Edit weights |

API contract: `backend/API.md`
