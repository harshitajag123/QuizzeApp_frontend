

import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io"; // Icon for adding a question
import { RxCross2 } from "react-icons/rx"; // Icon for removing a question
import Style from "../../Styles/CreateQuiz/getAllQues.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import GetOpts from "./GetOpts"; // Component for managing options
import GetQAndOptionType from "./GetQAndOptionType"; // Component for managing question and option types
import GetTimer from "./GetTimer"; // Component for handling timer settings
import Loader from "../../utils/Loader"; // Loader component for showing loading spinner
import { quizeInfo } from "../../utils/DummyObj/quize"; // Dummy object for quiz data
import baseURL from "../../utils/url";

const GetAllQues = ({ setUrl, changePopup, quizeData, type }) => {
	const navigate = useNavigate();

	// Initializing states with dummy data
	const dummyQ =
		quizeData.quizeType === "QnA"
			? quizeData.QnAQuestions // Using QnAQuestions if quiz type is QnA
			: quizeData.pollQuestions; // Using pollQuestions if quiz type is poll

	const initialOptions = [
		{
			text: "",
			imageURL: "",
		},
		{
			text: "",
			imageURL: "",
		},
	];

	const initialEditQues = [...dummyQ]; // Copying dummy questions for editing
	const initialCreateQues = [{ ...dummyQ[0], options: initialOptions }]; // Creating a new question with initial options
	const initialQues = type === "create" ? initialCreateQues : initialEditQues; // Determining whether to create or edit questions

	// Setting up state variables
	const [questions, setQuestions] = useState(initialQues);
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log("Timer Value:", quizeData.timePerQuestion); // Debugging
	}, [quizeData.timePerQuestion]);

	// Function to add a new question (max 6 questions allowed)
	const addQuestion = () => {
		if (questions.length < 6) {
			if (quizeData.type === "QnA") {
				setQuestions([
					...questions,
					{ ...quizeInfo.QnAQuestions[0], options: initialOptions },
				]);
			} else {
				setQuestions([
					...questions,
					{ ...quizeInfo.pollQuestions[0], options: initialOptions },
				]);
			}
		}
	};

	// Function to remove a question (except the first one)
	const removeQuestion = (val) => {
		if (val > 0) {
			setQuestions(questions.filter((q, i) => i !== val));
		}

		// Adjusting active question if the last question is removed
		if (val === questions.length - 1) {
			setActiveQuestion(val - 1);
		}
	};

	// Function to change the currently active question
	const changeActiveQ = (i) => {
		setActiveQuestion(i);
	};

	const handleTimerChange = (newTimerValue) => {
		console.log("New Timer Value:", newTimerValue); // Debugging
		quizeData.timePerQuestion = newTimerValue;
	};

	// Function to validate quiz data before submission
	// const validateQuizeData = () => {
	// 	let validate = false;

	// 	// Validating timer if quiz type is QnA
	// 	if (!quizeData.timePerQuestion && quizeData.quizeType === "QnA") {
	// 		toast.error("Please select the timer");
	// 		return validate;
	// 	}

	// 	// Validating each question and its options
	// 	for (let i = 0; i < questions.length; i++) {
	// 		if (!questions[i].ques) {
	// 			toast.error(`Enter the Question no. ${i + 1}`);
	// 			return validate;
	// 		}
	// 		for (let j = 0; j < questions[i].options.length; j++) {
	// 			if (
	// 				(!questions[i].options[j].text &&
	// 					questions[i].optionType === "text") ||
	// 				(!questions[i].options[j].imageURL &&
	// 					questions[i].optionType === "imageURL") ||
	// 				((!questions[i].options[j].text ||
	// 					!questions[i].options[j].imageURL) &&
	// 					questions[i].optionType === "textAndImageURL")
	// 			) {
	// 				toast.error(`Enter all options in Q.${i + 1}`);
	// 				return validate;
	// 			}
	// 		}

	// 		// Validating correct option if quiz type is QnA
	// 		if (!questions[i].correctOption && quizeData.quizeType === "QnA") {
	// 			toast.error(`Select correct option in Q.${i + 1}`);
	// 			return validate;
	// 		}
	// 	}

	// 	// Updating quiz data with the questions
	// 	if (quizeData.quizeType === "QnA") {
	// 		quizeData.QnAQuestions = questions;
	// 		quizeData.pollQuestions = [];
	// 	} else {
	// 		quizeData.pollQuestions = questions;
	// 		quizeData.QnAQuestions = [];
	// 	}

	// 	return true; // Returning true if all validations pass
	// };

	const validateQuizeData = () => {
		let validate = true;

		// if (!quizeData.timePerQuestion && quizeData.quizeType === "QnA") {
		// 	toast.error("Please select the timer");
		// 	validate = false;
		// }

		for (let i = 0; i < questions.length; i++) {
			if (!questions[i].ques) {
				toast.error(`Enter the Question no. ${i + 1}`);
				validate = false;
				break;
			}
			for (let j = 0; j < questions[i].options.length; j++) {
				if (
					(!questions[i].options[j].text &&
						questions[i].optionType === "text") ||
					(!questions[i].options[j].imageURL &&
						questions[i].optionType === "imageURL") ||
					((!questions[i].options[j].text ||
						!questions[i].options[j].imageURL) &&
						questions[i].optionType === "textAndImageURL")
				) {
					toast.error(`Enter all options in Q.${i + 1}`);
					validate = false;
					break;
				}
			}

			if (!questions[i].correctOption && quizeData.quizeType === "QnA") {
				toast.error(`Select correct option in Q.${i + 1}`);
				validate = false;
				break;
			}
		}

		if (validate) {
			if (quizeData.quizeType === "QnA") {
				quizeData.QnAQuestions = questions;
				quizeData.pollQuestions = [];
			} else {
				quizeData.pollQuestions = questions;
				quizeData.QnAQuestions = [];
			}
		}

		return validate;
	};

	// Function to handle quiz submission (create quiz)
	const submitCreateQuize = async () => {
		// Ensure timePerQuestion has a valid value
		if (!quizeData.timePerQuestion) {
			quizeData.timePerQuestion = "OFF"; // Or any default value that the server accepts
		}

		try {
			console.log("Payload:", quizeData); // Log payload for debugging
			const { data } = await axios.post(
				`${baseURL}/api/quiz/create-quiz`,
				quizeData,
				{
					headers: {
						Authorization: localStorage.getItem("authToken"), // Authorization token for API request
					},
				}
			);

			if (data.success) {
				setUrl(data.url);
				changePopup("lastPopup");
				toast.success(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.error);
		}
	};

	// Function to handle quiz submission (edit quiz)
	const submitEditQuize = async () => {
		try {
			const { data } = await axios.put(
				`${baseURL}/api/quiz/${quizeData._id}`,
				quizeData,
				{
					headers: {
						Authorization: localStorage.getItem("authToken"), // Authorization token for API request
					},
				}
			);
			if (data.success) {
				setUrl(data.url);
				changePopup("lastPopup");
				toast.success(data.message);
			}
		} catch (error) {
			toast.error(error.response.data.error);
		}
	};

	// Function to submit the quiz data to the API
	const submitQuize = async (e) => {
		e.preventDefault();

		if (validateQuizeData()) {
			setLoading(true);
			if (type === "create") {
				await submitCreateQuize(); // Create quiz if type is "create"
			} else {
				await submitEditQuize(); // Edit quiz if type is not "create"
			}
			setLoading(false);
		}
	};

	// Function to handle cancel button click
	const cancelHandler = () => {
		navigate("/dashboard"); // Navigate back to the dashboard
	};

	return (
		<>
			{/* Show loader while loading */}
			{loading && <Loader />}
			<form onSubmit={submitQuize} className={Style.addQcontainer}>
				<div className={Style.addQ}>
					<div className={Style.left}>
						{questions.map((q, i) => (
							<div key={i}>
								<div
									onClick={() => {
										changeActiveQ(i); // Change active question on click
									}}
									className={
										activeQuestion === i
											? `${Style.addCircle} ${Style.bgGreen}` // Highlight the active question
											: Style.addCircle
									}>
									<h2>{i + 1}</h2>
								</div>

								<RxCross2
									style={i === 0 && { display: "none" }} // Hide remove icon for the first question
									className={Style.removeIcon}
									onClick={() => {
										removeQuestion(i); // Remove question on click
									}}
								/>
							</div>
						))}

						<IoMdAdd
							className={Style.addIcon}
							style={questions.length === 5 && { display: "none" }} // Hide add icon if 5 questions are already present
							onClick={addQuestion} // Add question on click
						/>
					</div>
					<div className={Style.rgtSide}>Max 5 questions</div>
				</div>

				<div>
					{/* Display question type selector, timer, and options */}
					<GetQAndOptionType
						questions={questions}
						setQ={setQuestions}
						i={activeQuestion}
						type={quizeData.quizeType}
					/>
				</div>
				<div className={Style.optionsAndTimer}>
					<GetOpts
						questions={questions}
						quizeData={quizeData}
						no={activeQuestion}
						setQ={setQuestions}
					/>
					{/* <GetTimer quizeData={quizeData} /> */}
					{quizeData.quizeType === "QnA" && <GetTimer quizeData={quizeData} />}
				</div>

				{/* Display cancel and continue buttons */}

				<div className={Style.buttons}>
					<button onClick={cancelHandler}>Cancel</button>
					<button type="submit">{type} Quize</button>{" "}
				</div>
			</form>
		</>
	);
};

export default GetAllQues;
