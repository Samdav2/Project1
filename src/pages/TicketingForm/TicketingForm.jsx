import React from 'react';
import './TicketingForm.css';

export const TicketingForm = () => {
    return (
        <div className="container">
            <div className="status-bar">
                <img src="images/arrowback-icon.png" alt="Back" className="icon" />
                <span className="time">9:41</span>
                <div className="status-icons">
                    <img src="images/cellular-connection.svg" alt="Cellular" />
                    <img src="assets/wifi.svg" alt="Wifi" />
                    <img src="images/battery.svg" alt="Battery"  /> 
                </div>
            </div>
            <h1 className="form-title">Event Registration Form</h1>
            <h2 className="section-title">Attendee Information</h2>
            <p className="instruction">Please fill in the correct information</p>
            <div className="form-section">
                <div className="form-group">
                    <label>Full Name :-</label>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <label>Gender :-</label>
                    <span>M</span>
                    <input type="checkbox" />
                    <span>F</span>
                    <input type="checkbox" />
                </div>
                <div className="form-group">
                    <label>Email Address :-</label>
                    <input type="text" placeholder="enter your email here" />
                </div>
                <div className="form-group">
                    <label>Phone Number :- </label>
                    <input type="text" placeholder="(+234) 000 000" />
                    <p className="note">please enter a valid phone number</p>
                </div>
                <div className="form-group">
                  <label>Tickets :- </label>
                        <span className="label"></span> 
                        <select name="" id="">
                            <option value=""> Select type</option>
                            <option value=""> Regular  </option>
                            <option value=""> VIP </option>
                            <option value="">VVIP</option>
                        </select>
                           
                    
                </div>
                <div className="form-group">
                    <p>Would you like to be updated about upcoming events?</p>
                    <label>
                        <input type="radio" name="updates" />
                        Yes
                    </label>
                    <label>
                        <input type="radio" name="updates" />
                        No
                    </label>
                </div>
            </div>
            <button className="submit-button">SUBMIT</button>
            
        </div>
    );
};

export default TicketingForm;
