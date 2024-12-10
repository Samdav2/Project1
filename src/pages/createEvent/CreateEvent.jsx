import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import EventTablesForm from './EventTablesForm';

export const CreateEvent = () => {
  const Location = useLocation();
  const [eventDetails, setEventDetails] = useState({
    brand_name: Location.state.brandname,
    eventName: "",
    date: "",
    timeIn: "",
    timeOut: "",
    eventAddress: "",
    summary: "",
    picture: "",
    vip: "",
    vvip: "",
    price: "",
    category: "",
    account_name: "",
    account_number: "",
    bank: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tables, setTables] = useState([]);

  const handleTablesChange = (updatedTables) => {
    setTables(updatedTables);
    console.log("Updated Tables: ", updatedTables); // Log for debugging
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevEventDetails) => ({
      ...prevEventDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

      if (file && file.size > 5 * 1024 * 1024) { // 5MB size limit
      setMessage('File size exceeds 5MB. Please upload a smaller file.');
      return;
    }

    if (file) {
      setEventDetails({
        ...eventDetails,
        picture: file, 
      });
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("Event Created: ", eventDetails);


      const formDataToSend = new FormData();
    for (const key in eventDetails) {
      formDataToSend.append(key, eventDetails[key]);
    }
  

    try {
      const response = await axios.post("https://tick-dzls.onrender.com/event/event", formDataToSend,  {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
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
            name="vip"
            value={eventDetails.vip}
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
            name="vvip"
            value={eventDetails.vvip}
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
            name="price"
            value={eventDetails.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>

        {/* Add the Table Form */}
        <TableForm tables={tables} onChange={handleTablesChange} />

        {/* Bank Details Section */}
        <label>
          Account Name
          <input
            type="text"
            name="account_name"
            value={eventDetails.accountName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Account Number
          <input
            type="text"
            name="account_number"
            value={eventDetails.accountNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Bank
          <input
            type="text"
            name="bank"
            value={eventDetails.bank}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Event Image
          <input type="file"  onChange={handleImageChange} />
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateEvent;
