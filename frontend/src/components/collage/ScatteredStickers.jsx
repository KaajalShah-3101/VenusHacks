import Sticker from '../mascot/Sticker';

const PRESETS = {
  signin: [
    { kind: 'flower', size: 52, top: 40, left: 24, rotate: -15 },
    { kind: 'cloud', size: 64, top: 32, right: 24, rotate: 6 },
    { kind: 'sparkle', size: 36, top: 120, left: 48, rotate: 20 },
    { kind: 'leaf', size: 48, bottom: 80, left: 20, rotate: -30 },
    { kind: 'map', size: 56, bottom: 48, right: 16, rotate: -8 },
  ],
  onboarding: [
    { kind: 'sparkle', size: 32, top: 88, left: 16, rotate: 10 },
    { kind: 'cloud', size: 48, top: 72, right: 12, rotate: 6 },
    { kind: 'flower', size: 40, bottom: 48, right: 16, rotate: -20 },
  ],
  search: [
    { kind: 'sparkle', size: 32, top: 88, right: 16, rotate: 20 },
    { kind: 'flower', size: 40, top: 280, left: 8, rotate: -20 },
    { kind: 'cloud', size: 52, bottom: 40, right: 8, rotate: 4 },
  ],
  detail: [
    { kind: 'sparkle', size: 36, top: 88, left: 12, rotate: 15 },
    { kind: 'cloud', size: 56, top: 72, right: 12, rotate: 4 },
    { kind: 'flower', size: 40, bottom: 64, right: 12, rotate: -20 },
  ],
};

export default function ScatteredStickers({ variant = 'signin' }) {
  const items = PRESETS[variant] || PRESETS.signin;
  return (
    <>
      {items.map((item) => (
        <Sticker
          key={`${item.kind}-${item.top}-${item.left}`}
          kind={item.kind}
          size={item.size}
          rotate={item.rotate}
          style={{
            position: 'absolute',
            top: typeof item.top === 'number' ? item.top : item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}
