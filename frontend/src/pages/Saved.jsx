import { useEffect, useState } from "react";
import { getSavedPlaces } from "../utils/savedPlaces";
import VenueCard from "../components/VenueCard";
import Header from "../components/Header";

export default function Saved() {
const [saved, setSaved] = useState([]);

// 🔄 Load + sync saved places
useEffect(() => {
const loadSaved = () => {
setSaved(getSavedPlaces());
};


loadSaved();

// listen for updates (when saving/removing)
window.addEventListener("storage", loadSaved);

return () => {
  window.removeEventListener("storage", loadSaved);
};


}, []);

return (
<> <Header />


  <section style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
    <h1 className="script-title" style={{ marginBottom: 10 }}>
      💖 Saved Places
    </h1>

    {/* ✨ EMPTY STATE */}
    {saved.length === 0 && (
      <p
        className="hand"
        style={{
          textAlign: "center",
          marginTop: 40,
          color: "var(--ink-soft)",
        }}
      >
        ✨ No saved places yet — go explore!
      </p>
    )}

    {/* LIST */}
    <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
      {saved.map((venue) => (
        <li key={venue.google_place_id}>
          <VenueCard
            venue={venue}
            showRemove // ⭐ allows removing from here
          />
        </li>
      ))}
    </ul>
  </section>
</>

);
}
