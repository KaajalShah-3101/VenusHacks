import { useId } from 'react';
import { NorColors } from './norColors';

export default function Nor({ size = 120, expression = 'happy', waving = false, style = {} }) {
  const gid = `nor-glow-${useId().replace(/:/g, '')}`;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={style} aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={NorColors.glow} stopOpacity="0.95" />
          <stop offset="45%" stopColor={NorColors.body} stopOpacity="0.35" />
          <stop offset="100%" stopColor={NorColors.body} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="60" cy="98" rx="42" ry="22" fill={`url(#${gid})`} />

      <path
        d="M48 38 Q 40 22 34 14"
        stroke={NorColors.outline}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M72 38 Q 80 22 86 14"
        stroke={NorColors.outline}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="34"
        cy="14"
        r="4"
        fill={NorColors.bodyLight}
        stroke={NorColors.outline}
        strokeWidth="1.5"
      />
      <circle
        cx="86"
        cy="14"
        r="4"
        fill={NorColors.bodyLight}
        stroke={NorColors.outline}
        strokeWidth="1.5"
      />
      <circle cx="33" cy="13" r="1" fill="#fff" />
      <circle cx="85" cy="13" r="1" fill="#fff" />

      <g>
        <ellipse
          cx="24"
          cy="60"
          rx="16"
          ry="26"
          fill={NorColors.wing}
          fillOpacity="0.55"
          stroke={NorColors.outline}
          strokeWidth="1.5"
          strokeOpacity="0.7"
          transform="rotate(-22 24 60)"
        />
        <path
          d="M14 50 Q 22 62 30 76"
          stroke={NorColors.outline}
          strokeWidth="0.9"
          fill="none"
          opacity="0.45"
          transform="rotate(-22 24 60)"
        />
      </g>
      <g>
        <ellipse
          cx="96"
          cy="60"
          rx="16"
          ry="26"
          fill={NorColors.wing}
          fillOpacity="0.55"
          stroke={NorColors.outline}
          strokeWidth="1.5"
          strokeOpacity="0.7"
          transform="rotate(22 96 60)"
        />
        <path
          d="M106 50 Q 98 62 90 76"
          stroke={NorColors.outline}
          strokeWidth="0.9"
          fill="none"
          opacity="0.45"
          transform="rotate(22 96 60)"
        />
      </g>

      <ellipse
        cx="60"
        cy="68"
        rx="34"
        ry="32"
        fill={NorColors.body}
        stroke={NorColors.outline}
        strokeWidth="2.2"
      />
      <ellipse cx="60" cy="84" rx="22" ry="10" fill={NorColors.bodyLight} opacity="0.75" />
      <path
        d="M30 76 Q 60 82 90 76"
        stroke={NorColors.outline}
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />

      <ellipse cx="40" cy="72" rx="6.5" ry="4" fill={NorColors.blush} opacity="0.85" />
      <ellipse cx="80" cy="72" rx="6.5" ry="4" fill={NorColors.blush} opacity="0.85" />

      {expression === 'happy' && (
        <>
          <circle cx="49" cy="62" r="3" fill={NorColors.eye} />
          <circle cx="71" cy="62" r="3" fill={NorColors.eye} />
          <circle cx="50" cy="61" r="0.9" fill="#fff" />
          <circle cx="72" cy="61" r="0.9" fill="#fff" />
        </>
      )}
      {expression === 'wink' && (
        <>
          <path
            d="M45 62 Q 49 58 53 62"
            stroke={NorColors.eye}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="71" cy="62" r="3" fill={NorColors.eye} />
          <circle cx="72" cy="61" r="0.9" fill="#fff" />
        </>
      )}
      {expression === 'sleepy' && (
        <>
          <path
            d="M45 62 Q 49 65 53 62"
            stroke={NorColors.eye}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M67 62 Q 71 65 75 62"
            stroke={NorColors.eye}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      <path
        d="M55 73 Q 60 78 65 73"
        stroke={NorColors.outline}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {waving ? (
        <>
          <path
            d="M28 58 Q 18 46 22 36"
            stroke={NorColors.outline}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx="22"
            cy="36"
            r="3.5"
            fill={NorColors.body}
            stroke={NorColors.outline}
            strokeWidth="2"
          />
          <path
            d="M92 76 Q 100 80 102 86"
            stroke={NorColors.outline}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx="102"
            cy="86"
            r="3.5"
            fill={NorColors.body}
            stroke={NorColors.outline}
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <path
            d="M28 78 Q 24 84 28 90"
            stroke={NorColors.outline}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M92 78 Q 96 84 92 90"
            stroke={NorColors.outline}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      <g opacity="0.9">
        <circle cx="20" cy="100" r="1.6" fill={NorColors.bodyLight} />
        <circle cx="100" cy="98" r="1.4" fill={NorColors.bodyLight} />
        <circle cx="60" cy="112" r="1.2" fill={NorColors.bodyLight} />
        <path
          d="M10 92 L 12 92"
          stroke={NorColors.body}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M108 90 L 110 90"
          stroke={NorColors.body}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
