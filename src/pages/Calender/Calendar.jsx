import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-view">
      <h3>Event Calendar</h3>
      <Calendar onChange={onDateChange} value={date} />
      <p>Selected Date: {date.toDateString()}</p>
    </div>
  );
};

export default Calendar;
