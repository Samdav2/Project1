import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './MapView.css'
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"

const MapView = () => {
  // Retrieve passed state using useLocation hook
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const { eventId, eventAddress } = location.state || {}; // Default to empty object if no state is passed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug: Check if eventId and eventAddress are passed correctly
  console.log('MapView received:', eventId, eventAddress);

  // Fetch event details from the API
  const fetchData = async () => {
    if (!eventId) {
      setError("No eventId provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`https://tick-dzls.onrender.com/event/getEvent?eventId=${eventId}`);

      // Debug: Check the response data
      console.log('Fetched event data:', response.data);

      if (response.data && response.data.event) {
        setEvents(response.data.event); // Set the events data
      } else {
        setError("No event data found.");
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch event data when component mounts or eventId changes
  }, [eventId]);

  // Handle loading or error
  if (loading) {
    return <div>Loading event data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Embed Google Map iframe with the event address
  const EmbedMap = ({ eventAddress }) => {
    const src = `https://maps.google.com/maps?q=${encodeURIComponent(eventAddress)}&output=embed`;
    return (
      <div>
        <iframe
          width="100%"
          height="800"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
        ></iframe>
      </div>
    );
  };

  // Render the event details
  return (
    <div className="map-view">
    <BackButton />
      <h3>Event Location</h3>

      {/* Display Google Map with event address */}
      {eventAddress ? (
        <EmbedMap eventAddress={eventAddress} />
      ) : (
        <div>No event address provided.</div>
      )}

      {/* Display event details */}
      {events.length > 0 ? (
        events.map((event, index) => {
          const { event_name, event_address, time_in, summary, picture, date, price, vip_price, vvip_price } = event;
          const formattedDate = new Date(date).toLocaleDateString();
          const formattedTime = new Date(`1970-01-01T${time_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div className="event-section" key={index}>
              <div className="event-card">
                <img
                  src={`https://tick-dzls.onrender.com/${picture}`}
                  alt={event_name}
                  className="event-image"
                />
                <div className="event-info">
                  <h4 className="event-title">{event_name}</h4>
                  <p className="event-address">{event_address}</p>
                  <p className="event-summary">{summary}</p>
                  <p>Regular Price: NGN{parseFloat(price).toFixed(2)}</p>
                  <p>VIP Price: NGN{parseFloat(vip_price).toFixed(2)}</p>
                  <p>VVIP Price: NGN{parseFloat(vvip_price).toFixed(2)}</p>
                  <p className="event-date-time">
                    <span className="event-date">{formattedDate}</span> |
                    <span className="event-time">{formattedTime}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No events available.</div>
      )}
      <Footer />
    </div>
  );
};

export default MapView;
