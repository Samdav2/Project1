import React from 'react';
import './Notification.css';

const Notification = () => {
    return (
        <div className="container">
            <div className="actionBar">
                <div className="backButton">
                    <img src="https://placeholder.pics/svg/36.2x22" alt="Back" className="icon"/>
                </div>
                <div className="title">Notification</div>
                <div className="moreButton">
                    <img src="https://placeholder.pics/svg/36.2x22" alt="More" className="icon"/>
                </div>
            </div>
            <div className="statusBar">
                <div className="timeStyle">9:41</div>
                <img src="https://placeholder.pics/svg/27.9x10.67" alt="Cellular Connection" className="smallIcon"/>
                <img src="https://placeholder.pics/svg/25.16x11" alt="Wifi" className="smallIcon"/>
                <img src="https://placeholder.pics/svg/24.33x11.33" alt="Battery" className="smallIcon"/>
            </div>
            <div className="content">
                <div className="artwork">
                    <img src="https://placeholder.pics/svg/191.22x218.93" alt="Artwork" className="artImage" />
                    <div className="bubble"><span className="bubbleText">0</span></div>
                </div>
                <div className="titleText">No Notifications!</div>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
                </div>
            </div>
        </div>
    );
};

export default Notification;
