import React from "react";
import Style from "./../Styles/UtilsSection/LoadingButtons.module.css";
const LoadingButtons = () => {
	return (
		<>
			<div className={Style.spinnerContainer}>
				<div className={Style.spinner}></div>
			</div>
		</>
	);
};
export default LoadingButtons;
