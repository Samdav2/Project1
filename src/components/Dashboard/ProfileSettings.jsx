import React from "react";
import './ProfileSettings.css';

 const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <h3>Profile Settings</h3>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Organizer Name" />
        <label>Email:</label>
        <input type="email" placeholder="Email Address" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings ;
