import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SideMenu from "../SideMenuSection/SideMenu";
import Loader from "../../utils/Loader";
import HeaderElements from "./HeaderElements";
import QuizeCard from "./QuizElementCard";
import Style from "../../Styles/Dashboard/dashboardContainer.module.css";
import baseURL from "../../utils/url";
const DashboardContainer = () => {
	const [loading, setLoading] = useState(false);
	const [headerInfo, setHeaderInfo] = useState({
		totalQuizes: null,
		totalQuestions: null,
		totalImpressions: null,
	});

	const [allQuizes, setAllQuizes] = useState([]);

	const fetchQuizes = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get(`${baseURL}/api/quiz/user-quizes`, {
				headers: {
					authorization: localStorage.getItem("authToken"),
				},
			});

			// Setting the header information with the data received from the backend
			setHeaderInfo({
				totalQuizes: data.totalQuizes,
				totalQuestions: data.totalQuestions,
				totalImpressions: data.totalImpressions,
			});

			// Filter quizzes to only include those with more than 3 impressions
			const trendingQuizes = data.quizes.filter(
				(quiz) => quiz.impressions >= 2
			);

			// Setting the filtered quizzes to be displayed
			setAllQuizes(trendingQuizes);
		} catch (error) {
			toast.error(error?.response?.data?.error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchQuizes();
	}, []);

	return (
		<>
			<div style={{ display: "flex" }}>
				<SideMenu />
				<div style={{ justifyContent: "center", alignItems: "center" }}>
					{loading && <Loader />}
					<div className={Style.DashboardContainer}>
						<div>
							<HeaderElements info={headerInfo} />
						</div>
						<div>
							<h1>Trending Quizes</h1>
							<h3>
								NOTE : A quiz must have atleast 2 impressions to get listed on
								Trending List
							</h3>
							<div>
								{allQuizes.map((quize, i) => (
									<QuizeCard quizeData={quize} key={i} />
								))}
							</div>
							{allQuizes.length <= 0 && (
								<h2>
									You haven't created any quiz , Click on Create Quiz to create
									your first Quiz
								</h2>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default DashboardContainer;
