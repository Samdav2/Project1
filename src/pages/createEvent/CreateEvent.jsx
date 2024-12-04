import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";
import { Navigate, useNavigate } from "react-router-dom";

export const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    brand_name: "",
    eventName: "",
    date: "",
    timeIn: "",
    timeOut: "",
    eventAddress: "",
    summary: "",
    picture: "",
    vipPrice: "",
    vvipPrice: "",
    generalPrice: "",
    category: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevEventDetails) => ({
      ...prevEventDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails({
        ...eventDetails,
        picture: URL.createObjectURL(file), // Create an object URL for the image
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("Event Created: ", eventDetails);
    // Handle form submission, like sending the data to an API

    try {
      const response = await axios.post("https://tick-dzls.onrender.com/event/event", eventDetails);
      console.log("Event Response", response.data);

      if (response.data) {
        setMessage("Event Created Successfully");
        navigate("/success");
      } else {
        setMessage(response.data.message || "Unable To Create Event");
      }
    } catch (error) {
      console.error("Unable to create Event", error);
      setMessage("Unable To Create Event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <label>
          Brand Name
          <input
            type="text"
            name="brand_name"
            value={eventDetails.brand_name}
            onChange={handleChange}
            required
          />
        </label>

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
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time In
          <input
            type="time"
            name="timeIn"
            value={eventDetails.timeIn}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time Out
          <input
            type="time"
            name="timeOut"
            value={eventDetails.timeOut}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Location
          <input
            type="text"
            name="eventAddress"
            value={eventDetails.eventAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Summary
          <textarea
            name="summary"
            value={eventDetails.summary}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={eventDetails.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Art">Art</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Pricing Section */}
        <label>
          VIP Ticket Price
          <input
            type="number"
            name="vipPrice"
            value={eventDetails.vipPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        <label>
          VVIP Ticket Price
          <input
            type="number"
            name="vvipPrice"
            value={eventDetails.vvipPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Regular Ticket Price
          <input
            type="number"
            name="generalPrice"
            value={eventDetails.generalPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        {/* Image Upload Section */}
        <label>
          Upload Event Image
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {eventDetails.picture && (
          <div className="image-preview">
            <img src={eventDetails.picture} alt="Event Preview" />
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="button">
          {isSubmitting ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
