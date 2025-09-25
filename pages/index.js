import { useEffect, useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!location && !error) {
      if ("geolocation" in navigator) {
        setStatus("Requesting location...");
        navigator.geolocation.getCurrentPosition(
          pos => {
            const coords = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy
            };
            setLocation(coords);
            setStatus("Location acquired!");

            // Send to backend
            fetch('/api/log', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(coords)
            }).then(() => setStatus("Location logged!"));
          },
          err => {
            setError(err.message);
            setStatus("Failed to get location.");
          }
        );
      } else {
        setError("Geolocation not supported.");
        setStatus("Geolocation not supported.");
      }
    }
  }, [location, error]);

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 500, margin: "auto", padding: 32 }}>
      <h1>I-See-You Location Logger</h1>
      <p>{status}</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {location && (
        <div>
          <h2>Your Location</h2>
          <ul>
            <li>Latitude: {location.latitude}</li>
            <li>Longitude: {location.longitude}</li>
            <li>Accuracy: {location.accuracy} meters</li>
          </ul>
          <a href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
             target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
        </div>
      )}
    </main>
  );
}
