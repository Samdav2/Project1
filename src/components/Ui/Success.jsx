import React from "react";
import './success.css';
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"

const Success = () => {

    return(
        <div>
        <div className="div1">
        <BackButton />
            <div className="h1">
             <h1> <span className="h2"> Event Created Successfully </span></h1>
                 <img src="/assets/success.svg" alt="Success" />
             </div>
             </div>
            <Footer />
        </div>
    )
}

export default Success;
