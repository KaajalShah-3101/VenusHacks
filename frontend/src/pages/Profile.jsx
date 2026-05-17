import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import WeightSelector from '../components/WeightSelector';
import Header from '../components/Header';

const FIELDS = [
{
field: 'mobility_weight',
label: 'Mobility',
description: 'Ramps, door width, elevators, step-free access.',
},
{
field: 'noise_weight',
label: 'Noise',
description: 'Quiet environments and low background sound.',
},
{
field: 'lighting_weight',
label: 'Lighting',
description: 'Comfortable, non-harsh lighting.',
},
{
field: 'seating_weight',
label: 'Seating & space',
description: 'Available seating and comfortable spacing.',
},
];

export default function Profile() {
const { user, markProfileComplete } = useAuth();
const navigate = useNavigate();
const [weights, setWeights] = useState({
mobility_weight: 1,
noise_weight: 1,
lighting_weight: 1,
seating_weight: 1,
});
const [saving, setSaving] = useState(false);
const [error, setError] = useState('');
const [saved, setSaved] = useState(false);

useEffect(() => {
setSaved(false);
}, [weights]);

async function handleSave(e) {
e.preventDefault();
setSaving(true);
setError('');
try {
await api.saveProfile({ user_id: user.id, ...weights });
markProfileComplete();
setSaved(true);
setTimeout(() => navigate('/search'), 800);
} catch (err) {
setError(err.message);
} finally {
setSaving(false);
}
}

return (
<>
<Header />
  <div className="max-w-lg mx-auto space-y-6">
    <div>
      <h1 className="script-title" style={{ fontSize: 40, margin: 0 }}>
        Your profile
      </h1>
      <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>
        Update what matters to you. Match scores recalculate from these weights.
      </p>
    </div>

    <form onSubmit={handleSave} className="space-y-6">
      {FIELDS.map(({ field, label, description }) => (
        <section
          key={field}
          className="sticker-card"
          style={{ padding: 20 }}
        >
          <WeightSelector
            label={label}
            description={description}
            value={weights[field]}
            onChange={(v) => setWeights((prev) => ({ ...prev, [field]: v }))}
          />
        </section>
      ))}

      {error && (
        <p className="text-sm text-coral" role="alert">
          {error}
        </p>
      )}
      {saved && <p className="text-sm text-sage">Profile saved!</p>}

      <button
        type="submit"
        disabled={saving}
        className="am-btn big"
      >
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  </div>
</>
);
}
