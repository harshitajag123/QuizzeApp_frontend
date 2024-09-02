

import React, { useState } from "react";
import Style from "../../Styles/CreateQuiz/getTimer.module.css";

const GetTimer = ({ quizeData = {}, onTimerChange }) => {
	const [timer, setTimer] = useState(quizeData?.timePerQuestion || "OFF");

	const timeHandler = (val) => {
		setTimer(val);
		if (onTimerChange && typeof onTimerChange === "function") {
			onTimerChange(val); // Call the function passed down from the parent component
		}
	};

	return (
		<div
			className={Style.timer}
			style={{ display: quizeData.quizeType === "poll" ? "none" : "block" }}>
			<h2>Timer</h2>
			<div
				className={timer === "OFF" ? Style.bgRed : ""}
				onClick={() => timeHandler("OFF")}>
				OFF
			</div>
			<div
				className={timer === "5" ? Style.bgRed : ""}
				onClick={() => timeHandler("5")}>
				5 Sec
			</div>
			<div
				className={timer === "10" ? Style.bgRed : ""}
				onClick={() => timeHandler("10")}>
				10 Sec
			</div>
		</div>
	);
};

export default GetTimer;
