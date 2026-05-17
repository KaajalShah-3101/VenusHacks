const LABELS = {
  mobility_score: 'Mobility',
  noise_score: 'Noise level',
  lighting_score: 'Lighting',
  seating_score: 'Seating & space',
};

export default function DimensionBar({ field, value, max = 5 }) {
  const label = LABELS[field] || field;
  const pct = value != null ? (value / max) * 100 : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-[#3d3832]">{label}</span>
        <span className="text-[#6b6560]">
          {value != null ? `${value.toFixed(1)} / ${max}` : 'No reviews yet'}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-white/70 overflow-hidden">
        <div
          className="h-full rounded-full bg-sage transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
