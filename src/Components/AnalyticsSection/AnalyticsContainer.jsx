import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { getFormatedDate, getFormatedNo } from "../../utils/HelperFunc";
import Loader from "../../utils/Loader";
import CreateQuizePage from "../../Pages/CreateQuizePage";
import DeletePopup from "../AnalyticsSection/DeletePopup";
import baseURL from "../../utils/url";

//css
import Style from "../../Styles/Analytics/analyticsContainer.module.css";
import "react-toastify/dist/ReactToastify.css";

const AnalyticsContainer = () => {
	const [loading, setLoading] = useState(false);
	const [quizes, setQuizes] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [deletePopup, setDeletePopup] = useState({
		isOpen: false,
		id: "",
	});

	const fetchQuizes = async () => {
		setLoading(true);
		try {
			//url used
			const { data } = await axios.get(`${baseURL}/api/quiz/user-quizes`, {
				headers: {
					Authorization: localStorage.getItem("authToken"),
				},
			});

			setQuizes(data.quizes);
			console.log(data);
		} catch (error) {
			toast.error("Something went wrong!");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchQuizes();
	}, [refresh]);

	const onCopyFun = () => {
		toast.success("Link copied to your clipboard");
	};

	const editHandler = (q) => {
		return <CreateQuizePage quizeInfo={q} />;
	};

	console.log(quizes);

	return (
		<>
			{loading && <Loader />}
			<div className={Style.AnalysisTable}>
				<h1>Quiz Analysis</h1>
				<table>
					<thead>
						<tr>
							<td>S.No</td>
							<td>Quiz Name.No</td>
							<td>Created On</td>
							<td>Impressions</td>
							<td></td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{quizes.map((quize, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{quize.name}</td>
								<td>{getFormatedDate(quize.createdAt)} </td>
								<td>{getFormatedNo(quize.impressions)}</td>
								<td>
									<Link to={`edit-quize/${quize._id}`}>
										<FaRegEdit />
									</Link>
									<RiDeleteBin6Fill
										onClick={() => {
											setDeletePopup({ isOpen: true, id: quize._id });
										}}
									/>

									{/* <CopyToClipboard text={quize.url} onCopy={onCopyFun}>
										<IoShareSocial />
									</CopyToClipboard> */}
									<CopyToClipboard
										text={`${baseURL}/quiz/take-quiz/${quize._id}`}
										onCopy={onCopyFun}>
										<IoShareSocial />
									</CopyToClipboard>
								</td>
								<td>
									<Link to={`q-analysis/${quize._id}`}>
										Question Wise Analysis
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{quizes.length <= 0 && (
					<h2>
						You haven't created any Quiz, Click on Create Quiz to create your
						first Quiz
					</h2>
				)}
			</div>
			<DeletePopup
				popupInfo={deletePopup}
				setOpen={setDeletePopup}
				setLoading={setLoading}
				setRefresh={setRefresh}
			/>
		</>
	);
};

export default AnalyticsContainer;
