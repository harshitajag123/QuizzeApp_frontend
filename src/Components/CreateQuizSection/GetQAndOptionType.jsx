

import React from "react";
import Style from "../../Styles/CreateQuiz/getQnOptType.module.css";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetQAndOptionType = ({ questions, setQ, i, quizType }) => {
	// Function to handle changes in the question text or option type
	// const onQChange = (e) => {
	// 	const { name, value } = e.target;

	// 	// Ensure setQ is a function before calling it
	// 	if (typeof setQ === "function") {
	// 		setQ((prevData) => {
	// 			const newData = [...prevData];
	// 			if (name === "ques") newData[i].ques = value; // Update question text
	// 			else if (name === "optionType") newData[i].optionType = value; // Update option type
	// 			return newData;
	// 		});
	// 	} else {
	// 		console.error("setQ is not a function");
	// 	}
	// };

	const onQChange = (e) => {
		const { name, value } = e.target;

		if (typeof setQ === "function") {
			setQ((prevData) => {
				const newData = [...prevData];
				if (newData[i]) {
					if (name === "ques") newData[i].ques = value;
					else if (name === "optionType") newData[i].optionType = value;
				}
				return newData;
			});
		} else {
			console.error("setQ is not a function");
		}
	};

	return (
		<>
			<div className={Style.queContainer}>
				{/* Input field for the question */}
				<div className={Style.queInput}>
					<input
						type="text"
						value={questions[i]?.ques || ""}
						name="ques"
						onChange={onQChange}
						placeholder={
							quizType === "QnA" ? "Q & A Question" : "Poll Question"
						} // Dynamic placeholder based on quiz type
					/>
				</div>

				{/* Radio buttons to select the option type */}
				<div className={Style.optType}>
					<h2 className={Style.optTitle}>Option Type</h2>
					<div>
						<input
							id="text"
							name="optionType"
							value="text"
							type="radio"
							checked={questions[i]?.optionType == "text"}
							onChange={onQChange}
						/>
						<label htmlFor="text">Text</label>
					</div>

					<div>
						<input
							id="imgURL"
							name="optionType"
							value="imageURL"
							type="radio"
							checked={questions[i]?.optionType === "imageURL"}
							onChange={onQChange}
						/>
						<label htmlFor="imgURL">Image URL</label>
					</div>

					<div>
						<input
							id="text&ImgURL"
							name="optionType"
							value="textAndImageURL"
							type="radio"
							checked={questions[i]?.optionType === "textAndImageURL"}
							onChange={onQChange}
						/>
						<label htmlFor="text&ImgURL">Text & Image URL</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default GetQAndOptionType;
