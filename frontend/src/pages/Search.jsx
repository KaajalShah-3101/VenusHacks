import { useCallback, useEffect, useState } from 'react';
import { api, DEMO_VENUES } from '../api/client';
import { useAuth } from '../context/AuthContext';
import VenueCard from '../components/VenueCard';

const DEFAULT_LAT = 33.6846;
const DEFAULT_LNG = -117.8265;

export default function Search() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [venues, setVenues] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);

  const fetchScores = useCallback(
    async (list) => {
      const next = {};
      await Promise.all(
        list.map(async (v) => {
          try {
            const data = await api.getMatchScore(v.google_place_id, user.id);
            next[v.google_place_id] = data.match_score;
          } catch {
            next[v.google_place_id] = null;
          }
        })
      );
      setScores((prev) => ({ ...prev, ...next }));
    },
    [user.id]
  );

  useEffect(() => {
    fetchScores(DEMO_VENUES);
  }, [fetchScores]);

  async function handleSearch(e) {
    e?.preventDefault();
    setLoading(true);
    setError('');
    setShowDemo(false);
    try {
      const { venues: results } = await api.searchVenues({
        q: query || undefined,
        lat,
        lng,
      });
      setVenues(results || []);
      await fetchScores(results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not available in this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setError('');
      },
      () => setError('Could not get your location. Using default area.')
    );
  }

  const displayList = showDemo ? DEMO_VENUES : venues;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-coral m-0">Find a venue</h1>
        <p className="text-[#6b6560] mt-2 leading-relaxed">
          Search nearby places and see how well each one matches your profile.
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cafe, restaurant, study spot…"
          className="w-full px-4 py-3 rounded-xl border-2 border-salmon/30 bg-white/70 focus:border-coral focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={useMyLocation}
            className="px-4 py-2 rounded-xl border-2 border-sage/50 text-sage font-medium bg-transparent cursor-pointer hover:bg-sage/10 text-sm"
          >
            Use my location
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 rounded-xl bg-coral text-white font-semibold border-0 cursor-pointer hover:bg-coral/90 disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
        {error && (
          <p className="text-sm text-coral" role="alert">
            {error}
          </p>
        )}
      </form>

      {showDemo && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#6b6560] uppercase tracking-wide m-0">
            Demo venues (seeded data)
          </h2>
          <p className="text-sm text-[#8a8480] m-0 -mt-1">
            Use these for your pitch — they have accessibility reviews loaded.
          </p>
        </section>
      )}

      <ul className="space-y-3 list-none p-0 m-0">
        {displayList.map((venue) => (
          <li key={venue.google_place_id}>
            <VenueCard venue={venue} matchScore={scores[venue.google_place_id]} />
          </li>
        ))}
      </ul>

      {!showDemo && venues.length === 0 && !loading && (
        <p className="text-center text-[#8a8480]">No venues found. Try a different search.</p>
      )}
    </div>
  );
}
