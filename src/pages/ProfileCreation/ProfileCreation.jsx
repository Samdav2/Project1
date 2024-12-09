import React, { useReducer, useEffect } from 'react';
import './ProfileCreation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Initial state for the form
const initialState = {
  user: {
    name: '',
    email: '',
    address: '',
    phoneNo: '',
    user_id: '',
  },
  creator: {
    name: '',
    email: '',
    address: '',
    phoneNo: '',
    user_id: '',
    brandName: ''
  },
  isSubmitting: false,
  selectedForm: ''
};

// Action types
const ACTIONS = {
  SET_FORM: 'set_form',
  SET_FIELD: 'set_field',
  SET_SUBMITTING: 'set_submitting',
};

// Reducer function for form management
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FORM:
      return { ...state, selectedForm: action.payload };
    case ACTIONS.SET_FIELD:
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.name]: action.payload.value,
        },
      };
    case ACTIONS.SET_SUBMITTING:
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
};

const ProfileCreation = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize form state with location data
  useEffect(() => {
    const { id, name, email } = location.state;
    dispatch({ type: ACTIONS.SET_FIELD, payload: { form: 'user', name: 'user_id', value: id } });
    dispatch({ type: ACTIONS.SET_FIELD, payload: { form: 'creator', name: 'user_id', value: id } });
    dispatch({ type: ACTIONS.SET_FIELD, payload: { form: 'creator', name: 'name', value: name } });
    dispatch({ type: ACTIONS.SET_FIELD, payload: { form: 'creator', name: 'email', value: email } });
  }, [location.state]);

  // Form change handler
  const handleFormChange = (e) => {
    dispatch({ type: ACTIONS.SET_FORM, payload: e.target.value });
  };

  // Handle input changes dynamically for user and creator
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: ACTIONS.SET_FIELD, payload: { form: state.selectedForm, name, value } });
  };

  // Common submit handler for both user and creator profiles
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SET_SUBMITTING, payload: true });

    const formData = state[state.selectedForm];
    
    // Conditionally set the API URL based on the selected form
    const url = state.selectedForm === 'user' 
      ? 'https://tick-dzls.onrender.com/profile/userProfiles'  // User API endpoint
      : 'https://tick-dzls.onrender.com/profile/creatorProfiles'; // Creator API endpoint

    try {
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        console.log(`${state.selectedForm.charAt(0).toUpperCase() + state.selectedForm.slice(1)} Profile Created Successfully`);
        navigate(`/${state.selectedForm}-dashboard`, {
          state: { email: formData.email, name: formData.name, id: formData.user_id },
        });
      } else {
        console.log('Error Creating Profile');
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: ACTIONS.SET_SUBMITTING, payload: false });
    }
  };

  // Dynamically generate the form for either user or creator
  const renderForm = () => {
    const formFields = state.selectedForm === 'user' 
      ? ['name', 'phoneNo', 'address', 'email']
      : ['name', 'phoneNo', 'address', 'email', 'brandName'];

    return (
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          {formFields.map((field) => (
            <div key={field}>
              <label >{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={`Enter your ${field}`}
                value={state[state.selectedForm][field]}
                onChange={handleChange}
                name={field}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn" disabled={state.isSubmitting}>
          {state.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    );
  };

  return (
    <div className="dynamic-forms">
      <h1>Select a Profile</h1>
      <div className="select-wrapper">
        <label htmlFor="form-select">Choose a form:</label>
        <select
          id="form-select"
          onChange={handleFormChange}
          className="select"
          value={state.selectedForm}
        >
          <option value="" disabled>Select an option</option>
          <option value="user">User Profile</option>
          <option value="creator">Creator Profile</option>
        </select>
      </div>
      <div className="form-display">
        {state.selectedForm && renderForm()}
      </div>
    </div>
  );
};

export default ProfileCreation;
