export const VENUE_STICKERS = {
  'venue-1': { kind: 'coffee', color: 'var(--butter-soft)' },
  'venue-2': { kind: 'brain', color: 'var(--lavender-soft)' },
  'venue-3': { kind: 'pin', color: 'var(--coral-soft)' },
};

export const VENUE_TAGS = {
  'venue-1': ['step-free entry', 'quiet morning', 'wide aisles'],
  'venue-2': ['low light', 'soft surfaces', 'calm'],
  'venue-3': ['loud', 'narrow door', 'stairs'],
};

export const ONBOARDING_TRAIL = ['Mobility', 'Sensory', 'Cognitive', 'Vibe'];

export const ONBOARDING_STICKERS = ['hand', 'ear', 'eye', 'brain'];

export function fitLevel(score) {
  if (score == null) return 'unknown';
  if (score >= 4) return 'great';
  if (score >= 3) return 'ok';
  return 'low';
}

export function fitBadgeClass(score) {
  if (score == null) return 'low';
  if (score >= 85) return 'high';
  if (score >= 75) return 'mid';
  return 'low';
}
