export default function MatchBadge({ score, size = 'md' }) {
  if (score == null) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-white/80 text-[#8a8480] border border-salmon/30 font-medium ${
          size === 'lg' ? 'w-16 h-16 text-xs' : 'w-12 h-12 text-[10px]'
        }`}
      >
        No data
      </span>
    );
  }

  const pct = Math.round(score);
  const tone =
    pct >= 75 ? 'bg-sage text-white' : pct >= 50 ? 'bg-salmon text-white' : 'bg-coral text-white';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-full font-bold shadow-sm ${tone} ${
        size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
      }`}
      aria-label={`${pct}% match with your accessibility needs`}
    >
      <span className={size === 'lg' ? 'text-2xl' : 'text-lg'}>{pct}%</span>
      {size === 'lg' && <span className="text-[10px] font-normal opacity-90">match</span>}
    </div>
  );
}
