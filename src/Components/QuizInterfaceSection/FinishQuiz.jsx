import React from "react";
import Style from "../../Styles/QuizInterface/finishQuiz.module.css";
import TroImg from "../../utils/images/TroImg.png";

const FinishQuiz = ({ total, result }) => {
	return (
		<>
			
			<div className={Style.finishQuizeWrapper}>
				{result >= 0 && result !== null ? (
					<div className={Style.qnaQuizeMsg}>
						<h1> Congrats Quiz is Completed </h1>
						<img src={TroImg} alt="" />
						<h2>
							Your Score is <span>{`0${result}/0${total}`}</span>
						</h2>
					</div>
				) : (
					<div className={Style.pollFinishMsg}>
						<h1>Thank you for participating in the Poll</h1>
					</div>
				)}
			</div>
		</>
	);
};
export default FinishQuiz;
