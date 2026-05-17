import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import WeightSelector from '../components/WeightSelector';

const STEPS = [
  {
    id: 'mobility',
    title: 'Mobility',
    subtitle: 'Ramps, door width, elevators, parking',
    field: 'mobility_weight',
    description: 'How important is step-free access and room to move?',
  },
  {
    id: 'sensory-noise',
    title: 'Sensory — Noise',
    subtitle: 'Quiet spaces, low background sound',
    field: 'noise_weight',
    description: 'How much does noise level affect whether you can enjoy a place?',
  },
  {
    id: 'sensory-light',
    title: 'Sensory — Lighting',
    subtitle: 'Harsh fluorescents vs. comfortable light',
    field: 'lighting_weight',
    description: 'How sensitive are you to bright or flickering lighting?',
  },
  {
    id: 'comfort',
    title: 'Comfort & seating',
    subtitle: 'Seating, crowding, wait times',
    field: 'seating_weight',
    description: 'How much do available seating and comfortable spacing matter?',
  },
];

export default function Onboarding() {
  const { user, markProfileComplete } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [weights, setWeights] = useState({
    mobility_weight: 1,
    noise_weight: 1,
    lighting_weight: 1,
    seating_weight: 1,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function setWeight(field, value) {
    setWeights((prev) => ({ ...prev, [field]: value }));
  }

  async function finish() {
    setSaving(true);
    setError('');
    try {
      await api.saveProfile({
        user_id: user.id,
        ...weights,
      });
      markProfileComplete();
      navigate('/search');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleNext() {
    if (isLast) finish();
    else setStep((s) => s + 1);
  }

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div>
        <p className="text-sm text-sage font-medium m-0">
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="font-display text-3xl text-coral mt-2 mb-1">{current.title}</h1>
        <p className="text-[#6b6560] m-0">{current.subtitle}</p>
      </div>

      <div className="h-1.5 rounded-full bg-white/70 overflow-hidden">
        <div
          className="h-full bg-sage transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <section className="p-6 rounded-2xl bg-white/50 border border-salmon/25">
        <WeightSelector
          label="For you, this is…"
          description={current.description}
          value={weights[current.field]}
          onChange={(v) => setWeight(current.field, v)}
        />
      </section>

      {error && (
        <p className="text-sm text-coral" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 py-3 rounded-xl border-2 border-salmon/40 text-[#5c5650] font-medium bg-transparent cursor-pointer hover:border-coral/50"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={saving}
          className="flex-1 py-3 rounded-xl bg-coral text-white font-semibold border-0 cursor-pointer hover:bg-coral/90 disabled:opacity-60"
        >
          {saving ? 'Saving…' : isLast ? 'Find venues' : 'Next'}
        </button>
      </div>
    </div>
  );
}
