

import React, { useState, useEffect } from "react";
import Style from "../../Styles/QuizInterface/showQues.module.css";

const ShowQues = ({
	question,
	no,
	time,
	length,
	submitHandler,
	setNo,
	setOpt,
	correctOption,
}) => {
	const [button, setButton] = useState("NEXT");
	const [timer, setTimer] = useState(time);

	useEffect(() => {
		let timerId;
		if (timer > 0 && timer !== null) {
			timerId = setTimeout(() => {
				setTimer((t) => t - 1);
			}, 1000);
		} else if (timer === 0) {
			changeQuestion();
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [timer]);

	useEffect(() => {
		if (length === 1) {
			setButton("SUBMIT");
		}
		setTimer(time);
	}, [time]);

	const changeQuestion = () => {
		if (no === length - 2) {
			setButton("SUBMIT");
		}

		if (no === length - 1) {
			setTimer("00");
			submitHandler();
		} else {
			setTimer(time);
			setNo((prevNo) => prevNo + 1);
		}
	};

	const addCorrectOption = (i) => {
		setOpt((opts) => {
			let newData = [...opts];
			newData[no] = i;
			return newData;
		});
	};

	if (!question) {
		return <div>Loading question...</div>;
	}

	return (
		<>
			<div className={Style.takeQuizWrapper}>
				<div>
					<h2>{`0${no + 1}/0${length}`}</h2>
					<h2>{time && `00: ${timer}s`}</h2>
				</div>
				<div>
					<h1>{question.ques}</h1>
				</div>
				<div>
					{question.options.map((option, i) => (
						<div
							key={i}
							onClick={() => addCorrectOption(i + 1)}
							style={{
								borderColor:
									correctOption[no] === i + 1 ? "#5076FF" : "transparent",
								backgroundColor: "#F0F0F0",
								padding: "15px",
								margin: "10px 0px",
								cursor: "pointer",
								borderRadius: "10px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "25px",
								fontWeight: "600",
								borderWidth: correctOption[no] === i + 1 ? "2px" : "1px", // Add thin border
								borderStyle: "solid",
							}}
							className={
								question.optionType === "imageURL"
									? Style.imageOption
									: question.optionType === "imageAndText"
									? Style.imageAndText
									: Style.textOption
							}>
							{question.optionType === "imageURL" ||
							question.optionType === "imageAndText" ? (
								<img src={option.imageURL} alt="Option" />
							) : null}
							{question.optionType === "text" ||
							question.optionType === "imageAndText" ? (
								<p>{option.text}</p>
							) : null}
						</div>
					))}
				</div>
			</div>
			<div className={Style.nextButtonWrapper}>
				<button onClick={changeQuestion} className={Style.nextButton}>
					{button}
				</button>
			</div>
		</>
	);
};

export default ShowQues;
