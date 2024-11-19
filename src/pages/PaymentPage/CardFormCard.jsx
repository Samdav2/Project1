import React from 'react';
import './CardFormCard.css';



export const CardFormCard = () => {
    return (
        <div className="card-container">
            <h1 className="card-title">Card Payment Details</h1>
            <div className="payment-method">
                <p>Payment Method</p>
                <div className="card-icons">
                    <img src="images/master.png" alt="Mastercard" />
                    <img src="images/visa.png" alt="Visa" />
                    <img src="images/america.png" alt="American Express" />
                    <img src="images/discover.png" alt="Discover" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="card-name"> Name on card</label>
                <input type="text" id="card-name" placeholder="Jacobs Patel" />
        
            </div>
            <div className="form-group">
                <label>Card number</label>
                <input type="text" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="form-group expiry-group">
                <div>
                    <label>Card expiration</label>
                    <div className="select-input">
                        <span>Month</span>
                        <img src="https://placeholder.pics/svg/20x20" alt="arrow" />
                    </div>
                </div>
                <div>
                    <div className="select-input">
                        <span>Year</span>
                        <img src="https://placeholder.pics/svg/20x20" alt="arrow" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Card Security Code</label>
                <input type="text" placeholder="Code" />
                <img src="https://placeholder.pics/svg/20x20" alt="Info" className="info-icon" />
            </div>
            <button className="continue-button">Continue</button>
        </div>
    );
};

export default CardFormCard;
