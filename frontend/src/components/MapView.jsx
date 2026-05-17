import { useState } from "react";
import {
GoogleMap,
LoadScript,
Marker,
StreetViewPanorama,
} from "@react-google-maps/api";

const containerStyle = {
width: "100%",
height: "400px",
borderRadius: "24px",
overflow: "hidden",
};

// 🎨 Soft aesthetic map
const mapOptions = {
styles: [
{
elementType: "geometry",
stylers: [{ color: "#fef7f2" }],
},
{
elementType: "labels.text.fill",
stylers: [{ color: "#9b8f84" }],
},
{
featureType: "poi.business",
stylers: [{ visibility: "off" }],
},
{
featureType: "transit",
stylers: [{ visibility: "off" }],
},
{
featureType: "road",
elementType: "geometry",
stylers: [{ color: "#ffffff" }],
},
{
featureType: "water",
elementType: "geometry",
stylers: [{ color: "#e3f4fb" }],
},
],
disableDefaultUI: true,
};

export default function MapView({ venues, center, onSelect, onMapClick }) {
const [showStreetView, setShowStreetView] = useState(false);

return ( <LoadScript googleMapsApiKey="AIzaSyDUafFWC75_ZlRh7t2bXGKa0fBfwXK0suI">
<GoogleMap
mapContainerStyle={containerStyle}
center={center}
zoom={13}
options={mapOptions}


    // 🖱 click anywhere → move Nor
    onClick={(e) => {
      if (!onMapClick) return;

      const x = e.domEvent.offsetX;
      const y = e.domEvent.offsetY;

      onMapClick({ x, y });
    }}
  >
    {/* 📍 MARKERS */}
    {venues.map((v) => (
      <Marker
        key={v.google_place_id}
        position={{
          lat: v.lat,
          lng: v.lng,
        }}
        onClick={() => {
          if (onSelect) onSelect(v);

          // 🌍 turn on Street View
          setShowStreetView(true);
        }}
      />
    ))}

    {/* 🌍 STREET VIEW */}
    {showStreetView && center && (
      <StreetViewPanorama
        position={center}
        visible={true}
        options={{
          pov: { heading: 100, pitch: 0 },
          zoom: 1,
          disableDefaultUI: true,
        }}
      />
    )}
  </GoogleMap>
</LoadScript>


);
}
