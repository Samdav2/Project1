import React, { useState } from 'react';
import './DateTimeField.css';

const DateTimeField = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    return (
        <div className="date-time-container">
            <div className="time-field">
                <label htmlFor="start-time" className="time-label">Start time:</label>
                <input 
                    type="time" 
                    id="start-time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                    className="time-input"
                />
            </div>
            <div className="time-field">
                <label htmlFor="end-time" className="time-label">End time:</label>
                <input 
                    type="time" 
                    id="end-time" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)}
                    className="time-input"
                />
            </div>
        </div>
    );
};

export default DateTimeField;
