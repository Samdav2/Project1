import React from 'react';
import './MapView.css';
import searchIcon from '../../assets/group-18071.svg';
import mapIcon1 from '../..//assets/group-33510.svg';
import mapIcon2 from '../../assets/group-33511.svg';
import mapIcon3 from '../../assets/group-33512.svg';
import mapIcon4 from '../../assets/group-33513.svg';
import placeholderImage from '../../assets/image-23.svg';
import cardImage from '../../assets/group-33350.svg';

export const Mapview = () => {
  return (
    <div className="map-view">
      {/* Search Bar */}
      <div className="search-bar">
        <div className="search-input">
          
          <span>Find for food or restaurant...</span>
        </div>
      </div>

      {/* Filter Tabs */}

      {/* Map with Placeholders */}
      <div className="map">
        <img src={placeholderImage} alt="Map" className="map-image" />
        <img src={mapIcon1} alt="" className="map-icon" style={{ top: '267px', left: '81px' }} />
        <img src={mapIcon2} alt="" className="map-icon" style={{ top: '193px', left: '225px' }} />
        <img src={mapIcon3} alt="" className="map-icon" style={{ top: '337px', left: '257px' }} />
        <img src={mapIcon4} alt="" className="map-icon" style={{ top: '416px', left: '123px' }} />
      </div>

      {/* Event Card */}
      <div className="event-card">
        <img src={cardImage} alt="Event" className="event-image" />
        <div className="event-details">
          <p className="event-date">Wed, Apr 28 • 5:30 PM</p>
          <h3 className="event-title">Jo Malone London’s Mother’s Day Presents</h3>
          <p className="event-location">Radius Gallery • Santa Cruz, CA</p>
        </div>
      </div>
    </div>
  );
};

export default Mapview;
