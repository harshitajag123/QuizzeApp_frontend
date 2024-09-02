import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import baseURL from "../utils/url";
import Loading from "../utils/Loader";
import ShowQues from "../Components/QuizInterfaceSection/ShowQues";
import FinishQuiz from "../Components/QuizInterfaceSection/FinishQuiz";

// css files
import "react-toastify/dist/ReactToastify.css";

const QuizInterfacePage = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [no, setNo] = useState(0);
	const [correctOption, setCorrectOption] = useState([]);
	const [timer, setTimer] = useState(null);
	const [currentPopup, setCurrentPopup] = useState("takeQuize");
	const [isOpen, setIsOpen] = useState(true);
	const [result, setResult] = useState(null);

	const { id } = useParams();

	const fetchQue = async () => {
		try {
			const { data } = await axios.get(`${baseURL}/api/quiz/take-quiz/${id}`);

			//const { data } = await axios.get(`${baseURL}/api/quiz/take-quiz/${id}`);

			console.log(data);
			setLoading(true);
			console.log(data);
			setCorrectOption(Array(data.questions.length).fill(null));
			setQuestions(data.questions);
			setTimer(data.time && data.time !== "OFF" && data.time);

			if (data.quizeType === "QnA") {
				setResult(0);
			}
		} catch (error) {
			toast.error("Error in fetching questions");
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchQue();
	}, []);

	const submitHandler = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${baseURL}/api/quiz/save-quiz-result`,
				{ quizeId: id, choosedOptions: correctOption }
			);

			setResult(data.correctAttempts);
			toast.success(data.message);
		} catch (error) {
			toast.error("Error in submitting answers");
		}
		setCurrentPopup("finish");
		setLoading(false);
	};

	const popupContentStyle = {
		borderRadius: "10px",
		width: window.innerWidth <= 768 ? "100%" : "90%",
		height: window.innerWidth <= 768 ? "100%" : "90%",
	};

	return (
		<>
			<div></div>

			<Popup
				open={isOpen}
				closeOnDocumentClick
				onClose={() => setIsOpen(false)}
				contentStyle={popupContentStyle}>
				{loading && <Loading />}
				<div>
					{currentPopup === "takeQuize" ? (
						<ShowQues
							question={questions[no]}
							length={questions.length}
							time={timer}
							no={no}
							setNo={setNo}
							setOpt={setCorrectOption}
							correctOption={correctOption}
							submitHandler={submitHandler}
						/>
					) : (
						<FinishQuiz total={questions.length} result={result} />
					)}
				</div>
			</Popup>
		</>
	);
};

export default QuizInterfacePage;
