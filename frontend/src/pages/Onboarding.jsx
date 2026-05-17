import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import WeightSelector from '../components/WeightSelector';
import Nor from '../components/mascot/Nor';
import Sticker from '../components/mascot/Sticker';
import SquiggleUnderline from '../components/mascot/SquiggleUnderline';
import { ONBOARDING_STICKERS, ONBOARDING_TRAIL } from '../lib/venueMeta';

const STEPS = [
{
trailLabel: 'Mobility',
title: 'Mobility',
subtitle: 'Ramps, door width, elevators, parking',
field: 'mobility_weight',
description: 'How important is step-free access and room to move?',
stepLabel: 'step one',
},
{
trailLabel: 'Sensory',
title: 'Sensory',
subtitle: 'Quiet spaces, low background sound',
field: 'noise_weight',
description: 'How much does noise level affect whether you can enjoy a place?',
stepLabel: 'step two',
},
{
trailLabel: 'Cognitive',
title: 'Lighting',
subtitle: 'Harsh fluorescents vs. comfortable light',
field: 'lighting_weight',
description: 'How sensitive are you to bright or flickering lighting?',
stepLabel: 'step three',
},
{
trailLabel: 'Vibe',
title: 'Vibe',
subtitle: 'Seating, crowding, wait times',
field: 'seating_weight',
description: 'How much do available seating and comfortable spacing matter?',
stepLabel: 'step four',
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
const stickerKind = ONBOARDING_STICKERS[step];

function setWeight(field, value) {
setWeights((prev) => ({ ...prev, [field]: value }));
}

async function finish() {
setSaving(true);
setError('');
try {
await api.saveProfile({ user_id: user.id, ...weights });


  markProfileComplete();

  // ✅ FIX: persist onboarding completion per user session
  localStorage.setItem("accessmap_profile_complete", "true");

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

return ( <div>
<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
{ONBOARDING_TRAIL.map((label, i) => (
<div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
<div
style={{
width: 44,
height: 44,
borderRadius: '50%',
background: i === step ? 'var(--coral)' : 'var(--cream-2)',
border: i === step ? '2px solid var(--coral-deep)' : '2px dashed var(--coral-soft)',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
color: i === step ? 'white' : 'var(--ink-muted)',
fontWeight: 800,
fontSize: 16,
transform: i === step ? 'rotate(-5deg)' : 'none',
boxShadow: i === step ? '0 3px 0 var(--coral-deep)' : 'none',
}}
>
{i + 1} </div>
<span
className="hand"
style={{
fontSize: 13,
color: i === step ? 'var(--coral-deep)' : 'var(--ink-muted)',
}}
>
{label} </span> </div>
{i < ONBOARDING_TRAIL.length - 1 && ( <svg width="40" height="16" viewBox="0 0 80 20" aria-hidden="true"> <path
               d="M2 10 Q 20 -2 40 10 T 78 10"
               stroke="var(--coral-soft)"
               strokeWidth="2"
               strokeDasharray="3 4"
               fill="none"
             /> </svg>
)} </div>
))} </div>


  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
    <Sticker kind={stickerKind} size={64} rotate={-12} />
    <div>
      <div className="hand" style={{ color: 'var(--sage-deep)', fontSize: 18 }}>
        {current.stepLabel} ·
      </div>
      <div className="script-title" style={{ fontSize: 48 }}>
        {current.title}
      </div>
      <SquiggleUnderline width={180} />
      <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: '4px 0 0' }}>
        {current.subtitle}
      </p>
    </div>
  </div>

  <div className="sticker-card" style={{ padding: 24, marginBottom: 20, transform: 'rotate(-0.5deg)' }}>
    <div className="tape butter" style={{ top: -12, left: 48, transform: 'rotate(-6deg)' }} />
    <div className="tape sage" style={{ top: -10, right: 48, transform: 'rotate(8deg)' }} />

    <WeightSelector
      label="For you, this is…"
      description={current.description}
      value={weights[current.field]}
      onChange={(v) => setWeight(current.field, v)}
    />

    <div style={{ position: 'absolute', bottom: -18, right: 12, pointerEvents: 'none' }}>
      <Nor size={64} expression="happy" />
    </div>
  </div>

  {error && <p className="am-alert" role="alert">{error}</p>}

  <div style={{ display: 'flex', gap: 12 }}>
    {step > 0 && (
      <button type="button" onClick={() => setStep((s) => s - 1)} className="am-btn ghost">
        ← Back
      </button>
    )}

    <button type="button" onClick={handleNext} disabled={saving} className="am-btn" style={{ flex: 1 }}>
      {saving ? 'Saving…' : isLast ? 'Find venues ✿' : 'Next step →'}
    </button>
  </div>
</div>


);
}
