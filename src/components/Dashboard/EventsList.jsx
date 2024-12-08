import React, { useState, useEffect } from "react";
import axios from "axios"
import "./EventsList.css";

const EventsList = ( {brandName } ) => {
  [
    { "id": 1, "name": "Tech Conference 2024", "date": "2024-12-01" },
    { "id": 2, "name": "Art Expo", "date": "2024-12-10" }
  ]
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const datatoSend = {
    brand : brandName
  }

  console.log(datatoSend)

  const brand = brandName

  useEffect(() => {
    // Function to fetch events from the backend
    const fetchEvents = async () => {
      try {
        setLoading(true);
      const response = await axios.get(`https://tick-dzls.onrender.com/event/getEventCreated?brand=${brand}`); 
       if(response.data) {
        console.log(response.data)
         setEvents(response.data);
        }
        
      } catch (error) {
        setError("No data found");
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
        {events.map((event) => {
          const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          return (
            <li key={event.id}>
              {event.event_name} - {formattedDate}
            </li>
          );
        })}
      </ul>

      )}
    </div>
  );
};

export default EventsList;
