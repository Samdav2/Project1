import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EventCard } from './EventCard'; // Import EventCard
import dotenv from "dotenv"

const PaidEvents = ({ userId }) => {
  const [paidEvents, setPaidEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate

  const userEvent = import.meta.env.VITE_GET_ATTENDED_EVENT

  // Fetch paid events for the user
  const fetchPaidEvents = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${userEvent}${userId}`);
      setPaidEvents(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaidEvents(); // Fetch paid events when component mounts or userId changes
  }, [userId]);

  // Handle event card click and navigate to the map view page
  const handleEventClick = (eventId, eventAddress) => {
    // Navigate to map page with event ID and address as parameters
    navigate('/map', { state: { eventId, eventAddress } });
  };

  if (isLoading) return <div>Loading paid events...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="events">
      <h3>Paid Events</h3>
      <div className="event-cards">
        {paidEvents.length === 0 ? (
          <p>No paid events found.</p>
        ) : (
          paidEvents.map((event, index) => (
            <EventCard 
              key={index} 
              event={event} 
              onClick={() => handleEventClick(event.id, event.event_address)} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default PaidEvents;
