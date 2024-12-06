import React, { useState, useRef } from 'react';
import './VerifyTicket.css';
import { BrowserMultiFormatReader } from '@zxing/library';
import axios from 'axios';

const VerifyTicket = () => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scannedText, setScannedText] = useState(''); // For displaying the scanned code live
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  // Function to handle ticket code input change
  const handleTicketCodeChange = (e) => {
    setToken(e.target.value);
  };

  // Function to handle the submit event (manual input)
  const handleSubmit = async () => {
    if (!token) {
      setErrorMessage('Please enter a ticket code.');
      return;
    }

    const tokens = {
      token: token
    }

    try {
      console.log(tokens);
          const response = await axios.delete('https://tick-dzls.onrender.com/event/deleteTicket', {
      data: tokens  
    });


      // Handle the response message from the backend (check the message)
      if (response.data) {
        setIsValid(true);
        console.log(response.data)
        console.log(token)
        setErrorMessage('');
      } else {
        // If the message does not match, set invalid status and show error
        setIsValid(false);
        setErrorMessage('Invalid ticket code or ticket already deleted.');
      }
    } catch (error) {
      // Handle errors from the backend or network issues
      setIsValid(false);
      setErrorMessage(error.response?.data?.message || 'Error connecting to the API');
    }
  };

  // Handle the QR code scan result
  const handleScan = (result) => {
    if (result && !scannedText) { // Prevent setting multiple scans
      setScannedText(result.getText());
      setToken(result.getText());  // Corrected to use setToken
    }
  };

  // Start QR scanning
  const startScanning = () => {
    setScanning(true);
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          handleScan(result); // Handle scanned result
        }
        if (error && error instanceof Error) {
          console.error(error);
        }
      })
      .then((stream) => {
        setVideoStream(stream); // Set the video stream
      })
      .catch((err) => console.error('Error starting scanner:', err));
  };

  // Stop QR scanning
  const stopScanning = () => {
    setScanning(false);
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Ticket Validation</h1>

        {/* Display the current ticket code */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter ticket code"
            value={token}
            onChange={handleTicketCodeChange}
            className="input-field"
          />
        </div>

        {/* Display the live scanned ticket code */}
        {scanning && (
          <div className="scanned-text">
            <p>Scanning: {scannedText}</p>
          </div>
        )}

        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button">Validate Code</button>
        </div>

        <div className="qr-container">
          <button onClick={scanning ? stopScanning : startScanning} className="scan-button">
            {scanning ? 'Stop Scanning' : 'Scan QR Code'}
          </button>
        </div>

        {/* Display the video stream */}
        {scanning && (
          <div className="qr-reader">
            <video ref={videoRef} width="100%" height="auto" style={{ borderRadius: '10px' }} autoPlay />
          </div>
        )}

        {/* Display the validation status */}
        {isValid !== null && (
          <div className={`status ${isValid ? 'valid' : 'invalid'}`}>
            {isValid ? 'Ticket Code is Valid!' : errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyTicket;
