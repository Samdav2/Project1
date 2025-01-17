import React from "react";
import {useNavigate} from "react-router-dom";
import "./BackArrow.css"

const BackButton = () => {
	const navigate = useNavigate();

	const handleClick = () => {

	navigate(-1);
}

	return(
		<button onClick={handleClick} className="back-arrow1">
      <img src="/src/assets/arrow-left.svg" />
    </button>
		);
};

export default BackButton;