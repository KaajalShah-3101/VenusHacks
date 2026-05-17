const KEY = "vianor_saved_places";

export function getSavedPlaces() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function toggleSaved(place) {
  const saved = getSavedPlaces();

  const exists = saved.find(
    (p) => p.google_place_id === place.google_place_id
  );

  let updated;

  if (exists) {
    updated = saved.filter(
      (p) => p.google_place_id !== place.google_place_id
    );
  } else {
    updated = [...saved, place];
  }

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function isSaved(placeId) {
  const saved = getSavedPlaces();
  return saved.some((p) => p.google_place_id === placeId);
}