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

const RegistrationForm = () => {
    return (
        <div className="registration-form">
            <div className="status-bar">
                <img src="https://placeholder.pics/svg/650x46" alt="Status Bar" />
            </div>
            <div className="form-header">
                <img src="https://placeholder.pics/svg/36x23" alt="Back Arrow" />
                <span className="form-title">Form Registration / Tables</span>
            </div>
            <div className="form-body">
                <div className="form-group">
                    <label htmlFor="firstName" className="form-label">Name:</label>
                    <input id="firstName" type="text" className="form-input" placeholder="First" />
                    <input id="lastName" type="text" className="form-input" placeholder="Last" />
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input id="phone" type="text" className="form-input" placeholder="(+234) 000" />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address:</label>
                    <input id="email" type="email" className="form-input" placeholder="example@domain.com" />
                </div>

                <div className="form-group">
                    <label htmlFor="tables" className="form-label">Tables for?</label>
                    <div className="select-group">
                        <select id="tables" className="form-select">
                            <option value="">Select</option>
                            {/* Add more options as needed */}
                        </select>
                        <span className="form-count">5</span>
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
