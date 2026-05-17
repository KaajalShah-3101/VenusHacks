import { useCallback, useEffect, useState } from 'react';
import { api, DEMO_VENUES } from '../api/client';
import { useAuth } from '../context/AuthContext';
import VenueCard from '../components/VenueCard';
import Nor from '../components/mascot/Nor';
import MapView from "../components/MapView";
import Sticker from '../components/mascot/Sticker';
import SquiggleUnderline from '../components/mascot/SquiggleUnderline';
import Header from '../components/Header';

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
    <> 
      <Header />

      {/* 🗺️ MAP ADDED HERE */}
      <div style={{ margin: '16px 0' }}>
        <MapView
          venues={displayList}
          center={{ lat, lng }}
        />
      </div>

      <section>
        <header
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 12,
            marginBottom: 8,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <p className="hand" style={{ fontSize: 18, color: 'var(--sage-deep)', margin: 0 }}>
              where to today?
            </p>
            <h1 className="script-title" style={{ fontSize: 52, margin: '4px 0 0' }}>
              Find a venue
            </h1>
            <SquiggleUnderline width={260} />
          </div>
          <Sticker kind="map" size={56} rotate={-12} style={{ marginBottom: 8 }} />
          <Nor size={56} expression="happy" />
        </header>

        <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: '12px 0 20px' }}>
          Search nearby and see how well each one matches{' '}
          <em className="hand" style={{ fontSize: 18, color: 'var(--coral-deep)' }}>
            your
          </em>{' '}
          profile.
        </p>

        <form onSubmit={handleSearch} className="sticker-card" style={{ padding: 16, marginBottom: 20 }}>
          <span className="tape sage" style={{ top: -10, right: 24, position: 'absolute' }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍  Cafe, restaurant, study spot…"
            className="am-input"
            style={{ marginBottom: 12, background: 'var(--cream)' }}
          />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" onClick={useMyLocation} className="am-btn ghost">
              📍 Use my location
            </button>
            <button type="submit" disabled={loading} className="am-btn" style={{ flex: 1, minWidth: 140 }}>
              {loading ? 'Searching…' : 'Search nearby →'}
            </button>
          </div>
          {error && (
            <p className="am-alert" role="alert" style={{ marginTop: 12 }}>
              {error}
            </p>
          )}
        </form>

        {showDemo && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="hand" style={{ fontSize: 16, color: 'var(--ink-soft)' }}>
              ✿ Nearby spots — pre-loaded for the demo
            </span>
            <div style={{ flex: 1, borderTop: '2px dashed var(--coral-soft)' }} />
          </div>
        )}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayList.map((venue) => (
            <li key={venue.google_place_id}>
              <VenueCard venue={venue} matchScore={scores[venue.google_place_id]} />
            </li>
          ))}
        </ul>

        {!showDemo && venues.length === 0 && !loading && (
          <p className="hand" style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>
            No venues found. Try a different search.
          </p>
        )}
      </section>
    </>
  );
}