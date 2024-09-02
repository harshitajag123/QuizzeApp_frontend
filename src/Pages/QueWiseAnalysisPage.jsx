import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import QuizQueAnalysis from "../Components/QueAnalysisSection/QnAQues";
import PollQueAnalysis from "../Components/QueAnalysisSection/PollQues";
import SideMenu from "../Components/SideMenuSection/SideMenu";
import baseURL from "../utils/url";

const QueWiseAnalysisPage = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [quize, setQuize] = useState(null); // Initialize as null

	const fetchQuizes = async () => {
		setLoading(true);
		try {
			//url used
			const { data } = await axios.get(`${baseURL}/api/quiz/${id}`, {
				headers: {
					Authorization: localStorage.getItem("authToken"),
				},
			});
			setQuize(data.quize);
		} catch (error) {
			toast.error(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchQuizes();
	}, []);

	return (
		<>
			{loading && <Loader />}
			<div style={{ display: "flex" }}>
				<SideMenu />
				<div>
					{quize?.quizeType === "QnA" ? (
						<QuizQueAnalysis quizeData={quize} />
					) : (
						<PollQueAnalysis pollData={quize} />
					)}
				</div>
			</div>
		</>
	);
};

export default QueWiseAnalysisPage;
