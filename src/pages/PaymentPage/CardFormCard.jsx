import React from 'react';
import './CardFormCard.css';



export const CardFormCard = () => {
    return (
        <div className="card-container">
            <h1 className="card-title">Card Payment Details</h1>
            <div className="payment-method">
                <p>Payment Method</p>
                <div className="card-icons">
                    <img src="https://via.placeholder.com/32x32?text=Mastercard" alt="Mastercard" />
                    <img src="https://placeholder.pics/svg/32x32" alt="Visa" />
                    <img src="https://placeholder.pics/svg/32x32" alt="American Express" />
                    <img src="https://placeholder.pics/svg/32x32" alt="Discover" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="card-name"> Name on card</label>
                <input type="text" id="card-name" placeholder="Meet Patel" />
        
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
