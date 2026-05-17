const KEY = "vianor_photos";

// 📸 get photos for a venue
export function getPhotos(placeId) {
const all = JSON.parse(localStorage.getItem(KEY) || "{}");
return all[placeId] || [];
}

export function addPhoto(placeId, photo) {
const all = JSON.parse(localStorage.getItem(KEY) || "{}");

if (!all[placeId]) {
all[placeId] = [];
}

all[placeId].push(photo);

localStorage.setItem(KEY, JSON.stringify(all));
}
