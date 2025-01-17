import React, { useState } from "react";
import Overview from "./Overview";
import Analytics from "./Analytics";
import EventsList from "./EventsList";
import ProfileSettings from "./ProfileSettings";
import Footer from "./Footer"
import "./DashBoard.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import BackButton from "/src/components/Ui/BackArrow.jsx"


const Dashboard = () => {


const location = useLocation();
  console.log(location.state)
  const { name, email, user_id, brandName, phoneNo } = location.state || {};

    const [organizer, setOrganizer] = useState({
      name: name,
      email: email,
      brandName: brandName,
      lastLogin: "",
    });
  

   const Location = useLocation()

  const brandname = organizer.brandName

  console.log(brandname)

  function getInitials(name) {
  const nameParts = name.split(' ');
  
  const firstLetter = nameParts[0].charAt(0).toUpperCase();  // First letter of the first name
  const secondLetter = nameParts[1] ? nameParts[1].charAt(0).toUpperCase(): '';  // Second letter of the last name (if it exists)
  
  return firstLetter + secondLetter;
}

  const initials = getInitials(organizer.name)

  


  return (
    <>
      <BackButton />
      <div className="dashboard">

      <div className="profile-section ">
      
        <div className="names"> 
          <p><Avatar sx={{ bgcolor: deepPurple[700] }}>{initials}</Avatar></p> 

                  <h1 className="wel">Welcome, {organizer.name}</h1>

          </div>
         


                <div className="organizer-details">
              <p>Gmail: {organizer.email}</p>
              <p>Last Login: {organizer.lastLogin}</p>
            </div>


         

      </div>
         
          
        <div className="dashboard-content">
          <Overview brandName={brandname} />
        </div>

        <div className="dashboard-actions">
        <Link to="/add-event" state={{brandname}}> <button className="action-button create-event">Create Event</button> </Link>
           
        <Link to="/verify-ticket" state={{brandname}}> <button className="action-button1 verify-ticket">Verify Ticket</button> </Link> 
        </div>
       
        <div className="dashboard-content">
        <EventsList brandName={brandname}  />
          <ProfileSettings />
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
