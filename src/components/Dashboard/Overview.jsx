import React, { useState, useEffect } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom"
import "./Overview.css";
import dotenv from "dotenv"

const Overview = ( {brandName }) => {
  const [overview, setOverview] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const brandEvent = import.meta.env.VITE_GET_BRAND_EVENTS

 

  const datatoSend = {
    brand : brandName
  }

  console.log(datatoSend)

  const brand = brandName


useEffect(() => {
  const fetchOverview = async () => {
    setLoading(true); // Start loading when the request is made
    
    try {
      const response = await axios.get(`${brandEvent}${brand}`); 
      
      if(response.data) {
        console.log(response.data.length)
        overview.totalEvents = response.data.length;
          const currentDate = new Date();

          // Filter events that are in the future
          const futureEventCount = response.data.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate > currentDate;  // Check if the event is in the future
          }).length;

          overview.upcomingEvents = futureEventCount

      }  

    } catch (err) {
      setError("User has not created any event"); // Handle error if there is one
    } finally {
      setLoading(false); // Always stop loading after the request completes (whether successful or not)
    }
  };

  fetchOverview();
}, [brand]); // Ensure the effect is triggered when 'brand' changes


  return (
    <div className="overview">
      <h3>Dashboard Overview</h3>
      {loading && <p>Loading overview...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="stats">
          <div className="stat-card">
            <h4>Total Events</h4>
            <p>{overview.totalEvents}</p>
          </div>
          <div className="stat-card">
            <h4>Upcoming Events</h4>
            <p>{overview.upcomingEvents}</p>
          </div>
          <div className="stat-card">
            <h4>Total Attendees</h4>
            <p>{overview.totalAttendees}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
