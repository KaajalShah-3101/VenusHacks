export default function Sticker({ kind, size = 44, rotate = 0, style = {} }) {
  const s = size;
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 60 60',
    style: { transform: `rotate(${rotate}deg)`, ...style },
    'aria-hidden': true,
  };

  switch (kind) {
    case 'sparkle':
      return (
        <svg {...common}>
          <path
            d="M30 6 L34 26 L54 30 L34 34 L30 54 L26 34 L6 30 L26 26 Z"
            fill="#F3CF6F"
            stroke="#5D4A3A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path
            d="M30 8 L36 24 L54 26 L40 38 L44 54 L30 46 L16 54 L20 38 L6 26 L24 24 Z"
            fill="#F3CF6F"
            stroke="#5D4A3A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path
            d="M30 50 C 8 36 4 22 16 14 C 24 8 30 18 30 18 C 30 18 36 8 44 14 C 56 22 52 36 30 50 Z"
            fill="#F0A893"
            stroke="#5D4A3A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...common}>
          <path
            d="M14 38 C 6 38 6 26 16 26 C 16 16 32 14 36 24 C 46 22 50 36 42 40 L16 40 C 12 40 12 38 14 38 Z"
            fill="#C7DEEC"
            stroke="#5D4A3A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path
            d="M10 50 C 10 26 26 10 50 10 C 50 34 34 50 10 50 Z"
            fill="#8FAE7E"
            stroke="#5D4A3A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M14 46 Q 30 30 46 14" stroke="#5F8A55" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...common}>
          <path
            d="M30 8 C 18 8 12 18 12 26 C 12 38 30 54 30 54 C 30 54 48 38 48 26 C 48 18 42 8 30 8 Z"
            fill="#E1735A"
            stroke="#5D4A3A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="24" r="6" fill="#F6EDDF" stroke="#5D4A3A" strokeWidth="1.6" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common}>
          <path
            d="M6 30 Q 30 12 54 30 Q 30 48 6 30 Z"
            fill="#FBF4E8"
            stroke="#5D4A3A"
            strokeWidth="1.8"
          />
          <circle cx="30" cy="30" r="7" fill="#88B3CF" stroke="#5D4A3A" strokeWidth="1.6" />
          <circle cx="30" cy="30" r="3" fill="#2B2118" />
          <circle cx="32" cy="28" r="1" fill="#fff" />
        </svg>
      );
    case 'ear':
      return (
        <svg {...common}>
          <path
            d="M22 50 C 14 44 12 28 18 18 C 24 8 40 8 44 20 C 48 32 38 32 36 38 C 34 44 30 54 22 50 Z"
            fill="#F4E3CC"
            stroke="#5D4A3A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M26 32 Q 30 26 34 30" stroke="#5D4A3A" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'hand':
      return (
        <svg {...common}>
          <path
            d="M18 50 L18 30 Q 18 24 22 24 L 22 14 Q 22 10 26 10 Q 30 10 30 14 L 30 24 L 34 24 L 34 12 Q 34 8 38 8 Q 42 8 42 12 L 42 24 L 46 24 Q 50 24 50 28 L 50 44 Q 50 54 38 54 L 26 54 Q 18 54 18 50 Z"
            fill="#F4E3CC"
            stroke="#5D4A3A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'brain':
      return (
        <svg {...common}>
          <path
            d="M14 30 C 10 22 18 12 28 14 C 30 8 42 8 44 16 C 52 18 52 30 46 32 C 50 40 40 48 32 44 C 26 50 14 44 14 30 Z"
            fill="#E3D8F2"
            stroke="#5D4A3A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M28 14 Q 28 30 28 44" stroke="#5D4A3A" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case 'coffee':
      return (
        <svg {...common}>
          <path
            d="M14 22 L44 22 L42 48 Q 42 52 38 52 L 20 52 Q 16 52 16 48 Z"
            fill="#F4E3CC"
            stroke="#5D4A3A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M44 28 Q 54 28 54 36 Q 54 44 44 44"
            fill="none"
            stroke="#5D4A3A"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'map':
      return (
        <svg {...common}>
          <path
            d="M6 14 L22 10 L38 14 L54 10 L54 46 L38 50 L22 46 L6 50 Z"
            fill="#FBE9B5"
            stroke="#5D4A3A"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M22 10 L22 46 M 38 14 L 38 50"
            stroke="#5D4A3A"
            strokeWidth="1.4"
            fill="none"
            strokeDasharray="2 3"
          />
        </svg>
      );
    case 'flower':
      return (
        <svg {...common}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="30"
              cy="18"
              rx="7"
              ry="10"
              fill="#F0A893"
              stroke="#5D4A3A"
              strokeWidth="1.4"
              transform={`rotate(${a} 30 30)`}
            />
          ))}
          <circle cx="30" cy="30" r="5" fill="#F3CF6F" stroke="#5D4A3A" strokeWidth="1.4" />
        </svg>
      );
    case 'dot-ring':
      return (
        <svg {...common}>
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={30 + Math.cos(a) * 22}
                cy={30 + Math.sin(a) * 22}
                r="2.4"
                fill="#B3A0D4"
              />
            );
          })}
        </svg>
      );
    case 'asterisk':
      return (
        <svg {...common}>
          <g stroke="#C46A8F" strokeWidth="2.4" strokeLinecap="round">
            <path d="M30 12 L30 48" />
            <path d="M14 30 L46 30" />
            <path d="M19 19 L41 41" />
            <path d="M41 19 L19 41" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
