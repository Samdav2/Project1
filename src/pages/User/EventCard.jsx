import React from 'react';

export const EventCard = ({ event, onClick }) => (
  <div className="event-card" onClick={onClick}>
    <img src={`https://tick-dzls.onrender.com/${event.picture}`} alt={event.event_name} className="event-image" />
    <div className="event-info">
      <h4>{event.event_name}</h4>
      <p>{event.event_address}</p>
      <p>{event.summary}</p>
      <p>Price: NGN{parseFloat(event.price).toFixed(2)}</p>
      <p>
        {new Date(event.date).toLocaleDateString()} |{' '}
        {new Date(`1970-01-01T${event.time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
);
