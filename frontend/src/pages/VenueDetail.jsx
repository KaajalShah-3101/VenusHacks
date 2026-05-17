import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { api, DEMO_VENUES } from '../api/client';
import { useAuth } from '../context/AuthContext';
import DimensionBar from '../components/DimensionBar';
import MatchBadge from '../components/MatchBadge';

export default function VenueDetail() {
  const { placeId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const decodedId = decodeURIComponent(placeId);

  const venueFromState = location.state?.venue;
  const venueMeta =
    venueFromState ||
    DEMO_VENUES.find((v) => v.google_place_id === decodedId) || {
      google_place_id: decodedId,
      name: 'Venue',
      address: '',
    };

  const [reviews, setReviews] = useState([]);
  const [averages, setAverages] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [reviewData, matchData] = await Promise.all([
          api.getVenueReviews(decodedId),
          api.getMatchScore(decodedId, user.id),
        ]);
        if (!cancelled) {
          setReviews(reviewData.reviews || []);
          setAverages(reviewData.averages);
          setMatch(matchData.match_score);
        }
      } catch {
        if (!cancelled) {
          setReviews([]);
          setAverages(null);
          setMatch(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [decodedId, user.id]);

  const dims = ['mobility_score', 'noise_score', 'lighting_score', 'seating_score'];

  return (
    <div className="space-y-8">
      <Link
        to="/search"
        className="text-sm text-coral no-underline hover:underline inline-block"
      >
        ← Back to search
      </Link>

      <header className="flex gap-5 items-start">
        <div className="w-20 h-20 rounded-2xl bg-salmon/25 flex items-center justify-center text-3xl shrink-0">
          📍
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-3xl text-coral m-0 leading-tight">
            {venueMeta.name}
          </h1>
          <p className="text-[#6b6560] mt-1">{venueMeta.address}</p>
          {match != null && (
            <p className="text-sage font-medium mt-2">
              This venue meets {Math.round(match)}% of your needs
            </p>
          )}
        </div>
        <MatchBadge score={match} size="lg" />
      </header>

      <section className="p-6 rounded-2xl bg-white/50 border border-salmon/25 space-y-5">
        <h2 className="text-lg font-semibold m-0 text-[#3d3832]">Accessibility breakdown</h2>
        {loading ? (
          <p className="text-[#8a8480]">Loading ratings…</p>
        ) : averages?.review_count === 0 || !averages ? (
          <p className="text-[#8a8480]">
            No reviews yet. Be the first to share your experience.
          </p>
        ) : (
          dims.map((field) => (
            <DimensionBar key={field} field={field} value={averages[field]} />
          ))
        )}
      </section>

      {reviews.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold m-0">Recent reviews</h2>
          <ul className="space-y-3 list-none p-0 m-0">
            {reviews.slice(0, 5).map((r) => (
              <li
                key={r.id}
                className="p-4 rounded-xl bg-white/40 border border-salmon/20 text-sm space-y-1"
              >
                <p className="m-0 text-[#6b6560]">
                  Mobility {r.mobility_score}/5 · Noise {r.noise_score}/5 · Lighting{' '}
                  {r.lighting_score}/5 · Seating {r.seating_score}/5
                </p>
                <p className="m-0 text-xs text-[#8a8480]">
                  {r.door_width_ok ? 'Door width OK' : 'Narrow door'} ·{' '}
                  {r.has_step ? 'Steps at entrance' : 'Step-free entrance'}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        to={`/venue/${encodeURIComponent(decodedId)}/review`}
        state={{ venue: venueMeta }}
        className="block w-full py-3 rounded-xl bg-coral text-white text-center font-semibold no-underline hover:bg-coral/90"
      >
        Write a review
      </Link>
    </div>
  );
}
