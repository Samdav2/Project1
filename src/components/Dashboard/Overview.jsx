import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Overview.css";

const Overview = ({ brandName }) => {
  const [overview, setOverview] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
    eventId: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventId, setEventId] = useState('')

  const brandEvent = import.meta.env.VITE_GET_BRAND_EVENTS;
  const getEventAttendee = import.meta.env.VITE_ATTENDEE_EVENT;

  const brand_coded = encodeURIComponent(brandName);

  // Fetch the event overview data
  const fetchOverview = async () => {
    setLoading(true); // Start loading

    try {
      const response = await axios.get(`${brandEvent}${brand_coded}`);

      if (response.data && response.data.length > 0) {
        const currentDate = new Date();

        const totalEvents = response.data.length;
        const futureEventCount = response.data.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate > currentDate; // Future events
        }).length;

        setOverview({
          totalEvents,
          upcomingEvents: futureEventCount,
          totalAttendees: 0, // Placeholder for attendee count
          eventId: response.data[0].id, // Assuming the first event is the correct one
        });
      } else {
        setError("No events found for this brand.");
      }
    } catch (err) {
      setError("Error fetching event data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the event attendee data after the eventId is set
  const fetchEventAttendee = async () => {
    if (!overview.eventId) return; // Prevent fetching if eventId is not yet available

          
          const eventIds = {
            eventId: overview.eventId
          }

          console.log("Event Id 2", eventId)

    try {
      console.log ("event id" , overview.eventId)
      const response = await axios.get(getEventAttendee,
       { eventId }, // Send eventId as a URL parameter
      );

      if (response.data) {
        console.log("Attendee Events:", response.data);
        setOverview((prevState) => ({
          ...prevState,
          totalAttendees: response.data.length, // Assuming response has length for attendees
        }));
      } else {
        setOverview((prevState) => ({
          ...prevState,
          totalAttendees: 0,
        }));
      }
    } catch (err) {
      console.error("Error fetching event attendees", err);
      setError("Error fetching event attendees.");
    }
  };

  // Fetch the overview once the brandName changes
  useEffect(() => {
    fetchOverview();
  }, [brandName]); // Runs only when brandName changes

  // Fetch event attendees when eventId changes
  useEffect(() => {
    if (overview.eventId) {
      fetchEventAttendee();
    }
  }, [overview.eventId]); // Runs when eventId is updated

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
