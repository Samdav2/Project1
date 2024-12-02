import React, { useState, useEffect } from 'react';
import './Calendar.css';

export const Calendar = () => {
  const [events, setEvents] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    // Schedule notifications for upcoming events
    Object.keys(events).forEach(eventDate => {
      const eventTime = new Date(eventDate);
      const currentTime = new Date();
      const diff = eventTime - currentTime;

      if (diff > 0 && diff <= 600000) { // Notify 10 minutes before event
        setTimeout(() => {
          alert(`Reminder: Event on ${eventDate} is coming up soon!`);
        }, diff - 600000);
      }
    });
  }, [events]);

  const getFirstDayOfMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  };

  const getDaysInMonth = () => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  };

  const handleDateClick = (day) => {
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    const eventList = events[date] || [];
    alert(`Events on ${date}: \n${eventList.length > 0 ? eventList.join('\n') : 'No events scheduled'}`);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    setEvents(prevEvents => ({
      ...prevEvents,
      [newEvent.date]: [...(prevEvents[newEvent.date] || []), newEvent.title],
    }));

    setNewEvent({ title: '', date: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const calendarDays = [];

    // Add empty slots for the first row
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      calendarDays.push(
        <div
          key={day}
          className="calendar-cell"
          onClick={() => handleDateClick(day)}
        >
          {day}
          <div className="event-dot">
            {(events[date] && events[date].length) > 0 ? '•' : ''}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <h1>Event Calendar</h1>

      <div className="calendar">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-header">{day}</div>
        ))}
        {renderCalendarDays()}
      </div>

      <div className="event-form">
        <h3>Add Event</h3>
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          className="event-input"
        />
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Event Title"
          className="event-input"
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default Calendar;
