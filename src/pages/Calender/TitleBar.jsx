/*import React, { useState } from 'react';
import "./TitleBar.css"


export const TitleBar = () => {
  return (
    <div style={stylesTitleBar.container}>
      <div style={stylesTitleBar.statusBar}>
        <span style={stylesTitleBar.time}>9:41</span>
        <img
          src="https://placeholder.pics/svg/17x11"
          alt="Cellular Connection"
          style={stylesTitleBar.icon}
        />
        <img
          src="https://placeholder.pics/svg/15x11"
          alt="Wifi"
          style={stylesTitleBar.icon}
        />
        <img
          src="https://placeholder.pics/svg/24x11"
          alt="Battery"
          style={stylesTitleBar.icon}
        />
      </div>
      <div style={stylesTitleBar.navBar}>
        <img
          src="https://placeholder.pics/svg/22x22"
          alt="Back Arrow"
          style={{...stylesTitleBar.icon, marginRight: '12px'}}
        />
        <h1 style={stylesTitleBar.title}>Events</h1>
        <img
          src="https://placeholder.pics/svg/22x22"
          alt="More Options"
          style={{...stylesTitleBar.icon, marginLeft: 'auto'}}
        />
      </div>
    </div>
  );
};

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState('UPCOMING');

  return (
    <div className="event-tabs">
      <div
        className={`tab ${activeTab === 'UPCOMING' ? 'active' : ''}`}
        onClick={() => setActiveTab('UPCOMING')}
      >
        UPCOMING
      </div>
      <div
        className={`tab ${activeTab === 'PAST' ? 'active' : ''}`}
        onClick={() => setActiveTab('PAST')}
      >
        PAST EVENTS
      </div>
    </div>
  );
};

const EventInfo = () => {
  return (
    <div className="event-info">
      <img
        src="https://placeholder.pics/svg/202x202"
        alt="Calendar Illustration"
        className="event-info-image"
      />
      <div className="event-info-text">
        <h1 className="event-info-title">No Upcoming Event</h1>
        <p className="event-info-description">Lorem ipsum dolor sit amet, consectetur</p>
      </div>
    </div>
  );
};

const ExploreButton = () => {
  return (
    <button style={stylesExploreButton.containerStyle}>
      <span style={stylesExploreButton.textStyle}>Explore Events</span>
      <img src="https://placeholder.pics/svg/20x20" alt="arrow" style={stylesExploreButton.iconStyle} />
    </button>
  );
};

export const App = () => {
  return (
    <div>
      <TitleBar />
      <EventTabs />
      <EventInfo />
      <ExploreButton />
    </div>
  );
};

export default TitleBar;*/



import React, { useState } from 'react';
import "./TitleBar.css"; // Ensure this line is included to link the CSS file

export const TitleBar = () => {
  return (
    <div className="container">
      <div className="statusBar">
        <span className="time">9:41</span>
        <img
          src="https://placeholder.pics/svg/17x11"
          alt="Cellular Connection"
          className="icon"
        />
        <img
          src="https://placeholder.pics/svg/15x11"
          alt="Wifi"
          className="icon"
        />
        <img
          src="https://placeholder.pics/svg/24x11"
          alt="Battery"
          className="icon"
        />
      </div>
      <div className="navBar">
        <img
          src="https://placeholder.pics/svg/22x22"
          alt="Back Arrow"
          className="icon"
          style={{ marginRight: '12px' }}
        />
        <h1 className="title">Events</h1>
        <img
          src="https://placeholder.pics/svg/22x22"
          alt="More Options"
          className="icon"
          style={{ marginLeft: 'auto' }}
        />
      </div>
    </div>
  );
};

const EventTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="event-tabs">
      <div
        className={`tab ${activeTab === 'UPCOMING' ? 'active' : ''}`}
        onClick={() => setActiveTab('UPCOMING')}
      >
        UPCOMING
      </div>
      <div
        className={`tab ${activeTab === 'PAST' ? 'active' : ''}`}
        onClick={() => setActiveTab('PAST')}
      >
        PAST EVENTS
      </div>
    </div>
  );
};

const EventInfo = () => {
  const eventInfo = activeTab === 'UPCOMING'
    ? { title: 'No Upcoming Event', description: 'Lorem ipsum dolor sit amet, consectetur' }
    : { title: 'Past Event', description: 'Description of a past event.' };

  return (
    <div className="event-info">
      <img
        src="https://placeholder.pics/svg/202x202"
        alt="Calendar Illustration"
        className="event-info-image"
      />
      <div className="event-info-text">
        <h1 className="event-info-title">{eventInfo.title}</h1>
        <p className="event-info-description">{eventInfo.description}</p>
      </div>
    </div>
  );
};

const ExploreButton = () => {
  return (
    <button className="explore-button">
      <span>Explore Events</span>
      <img src="https://placeholder.pics/svg/20x20" alt="arrow" />
    </button>
  );
};

const Display = () => {
  const [activeTab, setActiveTab] = useState('UPCOMING');

  return (
    <div>
      <TitleBar />
      <EventTabs />
      <EventInfo />
      <ExploreButton />
    </div>
  );
};

export default Display;
