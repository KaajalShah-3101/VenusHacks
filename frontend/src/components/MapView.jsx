import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "24px",
  overflow: "hidden",
};

// ✅ SIMPLE SAFE STYLE (no complex objects)
const mapOptions = {
  styles: [
    {
      elementType: "geometry",
      stylers: [{ color: "#fef7f2" }],
    },

    // 📝 keep main labels but soften them
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

export default function MapView({ venues, center }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDUafFWC75_ZlRh7t2bXGKa0fBfwXK0suI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={mapOptions} // 👈 THIS is the only change
      >
        {venues.map((v) => (
          <Marker
            key={v.google_place_id}
            position={{
              lat: v.lat,
              lng: v.lng,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}