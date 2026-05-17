import Sticker from './mascot/Sticker';

const OPTIONS = [
  { value: 0, label: 'Not needed', emoji: '😌' },
  { value: 1, label: 'Helpful', emoji: '🌿' },
  { value: 2, label: 'Essential', emoji: '⭐' },
];

export default function WeightSelector({ label, description, value, onChange }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{label}</legend>
      {description && (
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, margin: '0 0 20px' }}>{description}</p>
      )}
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={label}>
        {OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <div key={opt.value} style={{ position: 'relative' }}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(opt.value)}
                className={`am-chip ${selected ? 'selected' : ''}`}
                style={{ padding: '12px 18px' }}
              >
                {opt.emoji} {opt.label}
              </button>
              {selected && opt.value === 1 && (
                <Sticker
                  kind="sparkle"
                  size={24}
                  style={{ position: 'absolute', top: -10, right: -6, pointerEvents: 'none' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
