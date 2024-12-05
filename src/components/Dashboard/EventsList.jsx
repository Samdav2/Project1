import React, { useState, useEffect } from "react";
import "./EventsList.css";

const EventsList = () => {
  [
    { "id": 1, "name": "Tech Conference 2024", "date": "2024-12-01" },
    { "id": 2, "name": "Art Expo", "date": "2024-12-10" }
  ]
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch events from the backend
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-list">
      <h3>My Events</h3>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.name} - {event.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsList;
