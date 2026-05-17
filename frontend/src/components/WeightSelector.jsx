const OPTIONS = [
  { value: 0, label: 'Not needed' },
  { value: 1, label: 'Helpful' },
  { value: 2, label: 'Essential' },
];

export default function WeightSelector({ label, description, value, onChange }) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-base font-semibold text-[#3d3832] mb-1">{label}</legend>
      {description && (
        <p className="text-sm text-[#6b6560] mb-3 leading-relaxed">{description}</p>
      )}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all border-2 cursor-pointer
                ${
                  selected
                    ? 'bg-coral text-white border-coral shadow-sm'
                    : 'bg-white/60 text-[#5c5650] border-salmon/40 hover:border-coral/50'
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
