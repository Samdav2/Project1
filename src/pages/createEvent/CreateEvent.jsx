/*import React, { useState } from "react";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    eventImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created: ", eventDetails);
    // You can handle form submission, such as sending data to an API
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <label>
          Event Name
          <input
            type="text"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Date
          <input
            type="date"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Location
          <input
            type="text"
            name="eventLocation"
            value={eventDetails.eventLocation}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Description
          <textarea
            name="eventDescription"
            value={eventDetails.eventDescription}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Image URL
          <input
            type="url"
            name="eventImage"
            value={eventDetails.eventImage}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit-btn">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
*/


import React, { useState } from "react";
import "./CreateEvent.css";

export const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    eventImage: "",
    ticketPrice: "",
    discountPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails({
        ...eventDetails,
        eventImage: URL.createObjectURL(file), // Create an object URL for the image
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created: ", eventDetails);
    // Handle form submission, like sending the data to an API
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <label>
          Event Name
          <input
            type="text"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Date
          <input
            type="date"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Location
          <input
            type="text"
            name="eventLocation"
            value={eventDetails.eventLocation}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Description
          <textarea
            name="eventDescription"
            value={eventDetails.eventDescription}
            onChange={handleChange}
            required
          />
        </label>

        {/* Pricing Section */}
        <label>
          Ticket Price
          <input
            type="number"
            name="ticketPrice"
            value={eventDetails.ticketPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Discount Price (optional)
          <input
            type="number"
            name="discountPrice"
            value={eventDetails.discountPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </label>

        {/* Image Upload Section */}
        <label>
          Upload Event Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {eventDetails.eventImage && (
          <div className="image-preview">
            <img src={eventDetails.eventImage} alt="Event Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
