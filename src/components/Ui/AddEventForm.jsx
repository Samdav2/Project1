import React, { useState } from 'react';
import './AddEventForm.css';
import EventHeader from './EventHeader';
import InputField from './InputField';
import DateTimeField from './DateTimeField';
import SummaryField from './SummaryField';
import RadioOption from './RadioOption';
import SaveButton from './SaveButton';

function AddEventForm() {
  const [formData, setFormData] = useState({
    organiserName: '',
    eventName: '',
    eventDate: '',
    eventVenue: '',
    address: '',
    ticketPrice: '',
    media: '',
    summary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="add-event-form">
      <EventHeader />
      <h1 className="form-title">Event <span className="blue-text">&gt;</span> Create Event</h1>
      <h2 className="form-subtitle">Add Event</h2>
      <h3 className="form-section-title">Overview</h3>
      
      <form>
        <InputField label="Organiser Name:-" value={formData.organiserName} onChange={(e) => handleInputChange({target: {name: 'organiserName', value: e.target.value}})} />
        <InputField label="Event Name :-" value={formData.eventName} onChange={(e) => handleInputChange({target: {name: 'eventName', value: e.target.value}})} />
        <InputField label="Even Date:-" value={formData.eventDate} onChange={(e) => handleInputChange({target: {name: 'eventDate', value: e.target.value}})} />
        <InputField label="Event Venue:-" value={formData.eventVenue} onChange={(e) => handleInputChange({target: {name: 'eventVenue', value: e.target.value}})} />
        <InputField label="Address:-" value={formData.address} onChange={(e) => handleInputChange({target: {name: 'address', value: e.target.value}})} />
        <InputField label="Ticket Price:-" value={formData.ticketPrice} onChange={(e) => handleInputChange({target: {name: 'ticketPrice', value: e.target.value}})} />
        
        <div className="media-field">
          <label>Media:-</label>
          <select value={formData.media} onChange={(e) => handleInputChange({target: {name: 'media', value: e.target.value}})}>
            <option value="">Select Image</option>
          </select>
        </div>

        <DateTimeField />
        
        <SummaryField value={formData.summary} onChange={(value) => handleInputChange({target: {name: 'summary', value}})} />
        
        <RadioOption />
        
        <SaveButton />
      </form>
    </div>
  );
}

export default AddEventForm;
