import React from 'react';
import './EventHeader.css';

const EventHeader = () => {
    return (
        <header className="event-header">
            <nav className="event-nav">
                <img 
                    src="https://placeholder.pics/svg/50x50" 
                    alt="Logo" 
                    className="event-logo"
                />
                <ul className="breadcrumbs">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item">Events</li>
                    <li className="breadcrumb-item">Start time</li>
                </ul>
            </nav>
            <div className="start-time">Start time:-</div>
        </header>
    );
};

export default EventHeader;
