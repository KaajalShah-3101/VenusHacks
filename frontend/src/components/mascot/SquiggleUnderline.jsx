export default function SquiggleUnderline({ width = 220, color = '#E1735A', style = {} }) {
  return (
    <svg width={width} height="12" viewBox="0 0 220 12" style={style} aria-hidden="true">
      <path
        d="M2 8 Q 18 2 36 8 T 70 8 T 104 8 T 138 8 T 172 8 T 206 8 T 218 6"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
