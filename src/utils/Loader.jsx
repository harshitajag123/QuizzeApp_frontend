import React from "react";
import Style from "../Styles/UtilsSection/loader.module.css";

const Loader = () => {
	return (
		<div className={Style.loaderOverlay}>
			<div className={Style.loader}></div>
		</div>
	);
};

export default Loader;
