import React from "react";
import {useNavigate} from "react-router-dom";
import "./BackArrow.css"
import arrow from "/src/assets/arrow-left.svg";

const BackButton = () => {
	const navigate = useNavigate();

	const handleClick = () => {

	navigate(-1);
}

	return(
		<button onClick={handleClick} className="back-arrow1">
      <img src={arrow} />
    </button>
		);
};

export default BackButton;