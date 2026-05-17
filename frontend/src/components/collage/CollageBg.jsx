export default function CollageBg({ color = 'var(--coral-soft)' }) {
  return (
    <svg className="bg-doodle" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="doodle" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          <g transform="translate(20 30)">
            <path
              d="M0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
              fill="none"
              stroke={color}
              strokeWidth="1.4"
            />
          </g>
          <path
            d="M70 70 Q 80 60 90 70 T 110 70"
            fill="none"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="130" cy="40" r="2.5" fill={color} />
          <g transform="translate(120 110)">
            <path
              d="M0 0 C -6 0 -8 4 -8 8 C -8 14 0 22 0 22 C 0 22 8 14 8 8 C 8 4 6 0 0 0 Z"
              fill="none"
              stroke={color}
              strokeWidth="1.4"
            />
          </g>
          <g transform="translate(40 130)">
            <path d="M0 4 C -6 0 -4 -4 0 -2 C 4 -4 6 0 0 4 Z" fill={color} opacity="0.4" />
          </g>
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="url(#doodle)" />
    </svg>
  );
}
