import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { api, DEMO_VENUES } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Nor from '../components/mascot/Nor';
import Sticker from '../components/mascot/Sticker';
import SquiggleUnderline from '../components/mascot/SquiggleUnderline';
import Header from '../components/Header';
import { VENUE_STICKERS, fitBadgeClass, fitLevel } from '../lib/venueMeta';
import { getPhotos, addPhoto } from "../utils/photoStorage"; // 📸 NEW

const MATCH_ROWS = [
{ key: 'mobility_score', sticker: 'hand', title: 'Mobility', note: 'Step-free entry, room to move' },
{ key: 'noise_score', sticker: 'ear', title: 'Hearing', note: 'Noise and sound levels' },
{ key: 'lighting_score', sticker: 'eye', title: 'Vision', note: 'Lighting comfort' },
{ key: 'seating_score', sticker: 'brain', title: 'Sensory', note: 'Seating and space' },
];

function norNote(match, name) {
if (match == null) return `"We don't have enough notes on ${name} yet — be the first to visit!"`;
if (match >= 85) {
return `"Step-free entry, quiet mornings, and wide aisles — should match your profile well!"`;
}
if (match >= 70) return `"Pretty good fit overall — a few things might be hit or miss for you."`;
return `"Some access barriers reported — check the breakdown before you go."`;
}

export default function VenueDetail() {
const { placeId } = useParams();
const location = useLocation();
const { user } = useAuth();
const decodedId = decodeURIComponent(placeId);

const venueMeta =
location.state?.venue ||
DEMO_VENUES.find((v) => v.google_place_id === decodedId) || {
google_place_id: decodedId,
name: 'Venue',
address: '',
};

const stickerMeta = VENUE_STICKERS[decodedId] || { kind: 'pin', color: 'var(--butter-soft)' };

const [reviews, setReviews] = useState([]);
const [averages, setAverages] = useState(null);
const [match, setMatch] = useState(null);
const [loading, setLoading] = useState(true);

// 📸 NEW STATE
const [photos, setPhotos] = useState([]);

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

      // 📸 LOAD PHOTOS
      setPhotos(getPhotos(decodedId));
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

// 📸 UPLOAD HANDLER
function handleUpload(e) {
const file = e.target.files[0];
if (!file) return;


const reader = new FileReader();

reader.onload = () => {
  const newPhoto = {
    url: reader.result,
    createdAt: Date.now(),
  };

  addPhoto(decodedId, newPhoto);
  setPhotos((prev) => [...prev, newPhoto]);
};

reader.readAsDataURL(file);


}

const badge = fitBadgeClass(match);

return (
<> <Header /> <section>


    {/* HEADER */}
    <header style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18 }}>
      <div
        style={{
          width: 88,
          height: 88,
          background: stickerMeta.color,
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(120,90,60,0.15)',
          transform: 'rotate(-4deg)',
          flexShrink: 0,
        }}
      >
        <Sticker kind={stickerMeta.kind} size={52} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className="script-title" style={{ fontSize: 44, margin: 0 }}>
          {venueMeta.name}
        </h1>
        <SquiggleUnderline width={200} />
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: '6px 0 0' }}>
          {venueMeta.address}
        </p>
      </div>

      {match != null && (
        <div className={`fit-badge ${badge}`} style={{ width: 80, height: 80 }}>
          <span className="score" style={{ fontSize: 26 }}>
            {Math.round(match)}
          </span>
          <span className="label">your fit</span>
        </div>
      )}
    </header>

    {/* NOR MESSAGE */}
    <article
      className="sticker-card"
      style={{
        padding: 16,
        background: 'var(--sage-soft)',
        marginBottom: 20,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <Nor size={52} expression="wink" />
      <div>
        <p className="hand" style={{ fontSize: 17, color: 'var(--sage-deep)', fontWeight: 700, margin: 0 }}>
          Nor says:
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '4px 0 0' }}>
          {norNote(match, venueMeta.name)}
        </p>
      </div>
    </article>

    {/* MATCH GRID */}
    <p className="hand" style={{ fontSize: 17, color: 'var(--ink-soft)', marginBottom: 10 }}>
      ✿ How this place matches you
    </p>

    {loading ? (
      <p style={{ color: 'var(--ink-muted)' }}>Loading ratings…</p>
    ) : !averages?.review_count ? (
      <p style={{ color: 'var(--ink-muted)' }}>No reviews yet. Be the first to share your experience.</p>
    ) : (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 12,
          marginBottom: 20,
        }}
      >
        {MATCH_ROWS.map((row) => {
          const score = averages[row.key];
          const level = fitLevel(score);

          return (
            <div
              key={row.key}
              className="sticker-card"
              style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}
            >
              <Sticker kind={row.sticker} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{row.title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                  {score != null ? `${score.toFixed(1)} / 5 avg` : row.note}
                </div>
              </div>
              <span className="hand">
                {level === 'great' ? 'great fit ✓' : level === 'ok' ? 'okay' : 'limited'}
              </span>
            </div>
          );
        })}
      </div>
    )}

    {/* NOTES */}
    {reviews.length > 0 && (
      <section style={{ marginBottom: 20 }}>
        <h2 className="hand" style={{ fontSize: 18, marginBottom: 10 }}>
          Recent notes
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reviews.slice(0, 4).map((r) => (
            <li key={r.id} className="sticker-card" style={{ padding: 12, fontSize: 14 }}>
              Mobility {r.mobility_score}/5 · Noise {r.noise_score}/5 · Lighting {r.lighting_score}/5 · Seating {r.seating_score}/5
            </li>
          ))}
        </ul>
      </section>
    )}

    {/* 📸 PHOTOS SECTION */}
    <section style={{ marginBottom: 20 }}>
      <h2 className="hand" style={{ fontSize: 18, marginBottom: 10 }}>
        Accessibility photos
      </h2>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {photos.map((p, i) => (
          <img
            key={i}
            src={p.url}
            alt="venue"
            style={{
              width: 110,
              height: 110,
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
            }}
          />
        ))}

        <label
          style={{
            width: 110,
            height: 110,
            borderRadius: 16,
            border: "2px dashed var(--coral-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "var(--cream)",
            fontSize: 24,
          }}
        >
          📸
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </section>

    {/* BUTTONS */}
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Link
        to={`/venue/${encodeURIComponent(decodedId)}/review`}
        state={{ venue: venueMeta }}
        className="am-btn ghost"
        style={{ flex: 1, textAlign: 'center', textDecoration: 'none', minWidth: 140 }}
      >
        📝 Leave a note
      </Link>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueMeta.address || venueMeta.name)}`}
        target="_blank"
        rel="noreferrer"
        className="am-btn"
        style={{ flex: 2, textAlign: 'center', textDecoration: 'none', minWidth: 160 }}
      >
        Get directions →
      </a>
    </div>

  </section>
</>

);
}
