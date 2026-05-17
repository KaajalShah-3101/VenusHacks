import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { api, DEMO_VENUES } from '../api/client';
import { useAuth } from '../context/AuthContext';

function SliderField({ label, value, onChange, low, high }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#3d3832]">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-coral"
        />
        <span className="w-8 text-center font-semibold text-coral">{value}</span>
      </div>
      <div className="flex justify-between text-xs text-[#8a8480]">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </label>
  );
}

function TriState({ label, value, onChange }) {
  const options = [
    { val: true, label: 'Yes' },
    { val: false, label: 'No' },
    { val: null, label: 'Unsure' },
  ];
  return (
    <fieldset className="border-0 p-0 m-0 space-y-2">
      <legend className="text-sm font-medium text-[#3d3832]">{label}</legend>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={String(opt.val)}
            type="button"
            onClick={() => onChange(opt.val)}
            className={`am-chip ${value === opt.val ? 'selected' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function ReviewForm() {
  const { placeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const decodedId = decodeURIComponent(placeId);

  const venue =
    location.state?.venue ||
    DEMO_VENUES.find((v) => v.google_place_id === decodedId) || {
      google_place_id: decodedId,
      name: 'Venue',
      address: '',
    };

  const [mobility, setMobility] = useState(3);
  const [noise, setNoise] = useState(3);
  const [lighting, setLighting] = useState(3);
  const [seating, setSeating] = useState(3);
  const [doorWidthOk, setDoorWidthOk] = useState(null);
  const [hasStep, setHasStep] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.submitReview({
        google_place_id: venue.google_place_id,
        name: venue.name,
        address: venue.address,
        lat: venue.lat,
        lng: venue.lng,
        user_id: user.id,
        mobility_score: mobility,
        noise_score: noise,
        lighting_score: lighting,
        seating_score: seating,
        door_width_ok: doorWidthOk,
        has_step: hasStep,
      });
      navigate(`/venue/${encodeURIComponent(decodedId)}`, { state: { venue } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <Link
        to={`/venue/${encodeURIComponent(decodedId)}`}
        state={{ venue }}
        className="text-sm text-coral no-underline hover:underline"
      >
        ← Back to venue
      </Link>

      <div>
        <h1 className="script-title" style={{ fontSize: 40, margin: 0 }}>
          Share your visit
        </h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>{venue.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="sticker-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 className="text-base font-semibold m-0">How was the noise?</h2>
          <SliderField
            label="Noise level (1 = very loud, 5 = very quiet)"
            value={noise}
            onChange={setNoise}
            low="Loud"
            high="Quiet"
          />
        </section>

        <section className="sticker-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 className="text-base font-semibold m-0">Mobility & entrance</h2>
          <SliderField
            label="Overall mobility access"
            value={mobility}
            onChange={setMobility}
            low="Difficult"
            high="Easy"
          />
          <TriState
            label="Was the entrance step-free?"
            value={hasStep === null ? null : !hasStep}
            onChange={(v) => setHasStep(v === null ? null : !v)}
          />
          <TriState
            label="Was the doorway wide enough for a wheelchair?"
            value={doorWidthOk}
            onChange={setDoorWidthOk}
          />
        </section>

        <section className="sticker-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 className="text-base font-semibold m-0">Sensory & comfort</h2>
          <SliderField
            label="Lighting (1 = harsh, 5 = comfortable)"
            value={lighting}
            onChange={setLighting}
            low="Harsh"
            high="Comfortable"
          />
          <SliderField
            label="Seating & space (1 = cramped, 5 = spacious)"
            value={seating}
            onChange={setSeating}
            low="Cramped"
            high="Spacious"
          />
        </section>

        {error && (
          <p className="text-sm text-coral" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="am-btn big"
        >
          {saving ? 'Submitting…' : 'Submit review'}
        </button>
      </form>
    </div>
  );
}
