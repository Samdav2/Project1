import React, { useState, useEffect } from "react";
import axios from "axios"
import "./EventsList.css";
import dotenv from "dotenv"
import deleteicon from "/src/assets/delete.png";

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

  const deleteEvent= import.meta.env.VITE_DELETE_EVENT

  const handleDeleteBuutton = async (eventId) => {
    try {
      console.log('Deleting Event With Id:', eventId)
      const response = await axios.delete(deleteEvent, {
        data: { eventId },
      });

      if (response.data) {
        console.log('Deletion Response:', response.data);
      } else {
        setError('Deletion Failed. Event does not exist or insufficient permission')
      }
    } catch (error) {
      console.error('Deletion error:', error);
      setError(error.response?.data?.message || 'Error Deleting Event');
    }

  }

  const brand = brandName

  const brandEvent = import.meta.env.VITE_GET_BRAND_EVENTS

  useEffect(() => {
    // Function to fetch events from the backend
    const fetchEvents = async () => {
      try {
        setLoading(true);
      const response = await axios.get(`${brandEvent}${brand}`);
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
              {event.event_name} - {formattedDate} <div className="listDiv" onClick={() => handleDeleteBuutton (event.id)}> <img src={deleteicon} /> </div>
            </li>
          );
        })}
      </ul>

      )}
    </div>
  );
};

export default EventsList;
