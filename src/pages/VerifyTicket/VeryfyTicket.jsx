import React, { useState, useRef } from 'react';
import './VerifyTicket.css';
import { BrowserMultiFormatReader } from '@zxing/library';
import axios from 'axios';

const VerifyTicket = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scannedText, setScannedText] = useState(''); // For displaying the scanned code live
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  // Function to handle ticket code input change
  const handleTicketCodeChange = (e) => {
    setTicketCode(e.target.value);
  };

  // Function to handle the submit event (manual input)
  const handleSubmit = async () => {
    if (!ticketCode) {
      setErrorMessage('Please enter a ticket code.');
      return;
    }

    try {
      const response = await axios.post('https://your-api-endpoint.com/validate', { ticketCode });
      if (response.data.valid) {
        setIsValid(true);
        setErrorMessage('');
      } else {
        setIsValid(false);
        setErrorMessage('Invalid ticket code.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the API.');
      setIsValid(false);
    }
  };

  // Handle the QR code scan result
  const handleScan = (result) => {
    if (result) {
      setScannedText(result.getText()); // Update live scanning text
      setTicketCode(result.getText());  // Set ticket code
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
            value={ticketCode}
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
