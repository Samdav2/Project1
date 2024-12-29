import React from "react";
import './Error.css'
import BackButton from "/src/components/Ui/BackArrow.jsx"
import Footer from "/src/components/Dashboard/Footer.jsx"

const Error = () => {

    return(
        <div className="div1">
         <BackButton />
            <p> <span className="h1"> Error 404 </span></p>
            <p> <span className="p1"> Page Not Found </span> </p>
             <Footer />
        </div>

    )
}

export default Error
