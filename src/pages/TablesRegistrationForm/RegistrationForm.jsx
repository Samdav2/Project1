import React from 'react';
import './Registrationform.css'; // Import the corresponding CSS file

/*interface RegistrationFormProps { (Using  React.FC FUNCTION tSX)
    // Define any props here if needed
    const RegistrationForm = (props: RegistrationFormProps) => {
    return (
        <div className="registration-form">
            {/* Component content */
          /*  </div>
        );
    };
}*/

 export const RegistrationForm = () => {
    return (
        <div className="registration-form">
            <div className="status-bar">
                <img src="https://placeholder.pics/svg/650x46" alt="Status Bar" />
            </div>
            <div className="form-header">
                <img src="images/arrowback-icon.png" alt="Back Arrow" />
                <span className="form-title">Form Registration / Tables</span>
            </div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="firstName" className="form-label">Name:</label>
                    <input id="firstName" type="text" className="form-input" placeholder="FirstName" />
                    <input id="lastName" type="text" className="form-input" placeholder="LastName"
                    autoComplete="family-name" 
                     />
                    
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number :</label>
                    <input id="phone" type="text" className="form-input" placeholder="(+234) 000 000"
                    autoComplete="tel" 
                     />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address :</label>
                    <input id="email" type="email" className="form-input" placeholder="example@domain.com" 
                    autoComplete="email" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tables" className="form-label">Tables for?</label>
                    <div className="select-group">
                        <select id="tables" className="form-select">
                            <option value="">Select</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            
                            {/* Add more options as needed */}
                        </select>
                        
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="members" className="form-label">Members Names:</label>
                    <textarea id="members" className="form-textarea"></textarea>
                </div>

                <button type="submit" className="submit-button">SUBMIT</button>
            </div>
        </div>
    );
};

export default RegistrationForm;
