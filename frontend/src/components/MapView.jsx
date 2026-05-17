import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function MapView({ venues, center }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDUafFWC75_ZlRh7t2bXGKa0fBfwXK0suI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
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