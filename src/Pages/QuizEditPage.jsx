
import React, { useEffect, useState } from "react";
import CreateQuizePage from "./CreateQuizePage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import baseURL from "../utils/url";

const QuizEditPage = () => {
  const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [quizeData, setQuizeData] = useState({});

	const fetchQuizes = async () => {
		try {
			//url used
			const { data } = await axios.get(`${baseURL}/api/quiz/${id}`, {
				headers: {
					authorization: localStorage.getItem("authToken"),
				},
			});

			setQuizeData(data.quize);
			console.log(data);
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchQuizes();
	}, [id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				quizeData && <CreateQuizePage quizeInfor={quizeData} type={"update"} />
			)}
		</>
	);
};
export default QuizEditPage;
