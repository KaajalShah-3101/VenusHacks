import { useEffect, useState } from "react";
import { getSavedPlaces } from "../utils/savedPlaces";
import VenueCard from "../components/VenueCard";

export default function Saved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setSaved(getSavedPlaces());
  }, []);

  return (
    <section style={{ padding: 20 }}>
      <h1>💖 Saved Places</h1>

      {saved.length === 0 && <p>No saved places yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {saved.map((venue) => (
          <li key={venue.google_place_id}>
            <VenueCard venue={venue} />
          </li>
        ))}
      </ul>
    </section>
  );
}