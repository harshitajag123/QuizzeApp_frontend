import React, { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import baseURL from "../../utils/url";

//css files
import Style from "../../Styles/Analytics/deletePopup.module.css";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";


const DeletePopup = ({ popupInfo, setOpen, setLoading, setRefresh }) => {
	const navigate = useNavigate();
	const deleteQuize = async () => {
		navigate("/anaytics");
		setOpen({ isOpen: false, id: "" });
		setLoading(true);
		try {
			//url used
			const { data } = await axios.delete(
				`${baseURL}/api/quiz/${popupInfo?.id}`,
				{
					headers: {
						authorization: localStorage.getItem("authToken"),
					},
				}
			);
			setRefresh((prev) => !prev);
			toast.success("Quiz deleted successfully");
		} catch (error) {
			toast.error("Error in deleting quiz");
		}
	};
	return (
		<>
			

			<Popup
				open={popupInfo.isOpen}
				closeOnDocumentClick
				onClose={() => {
					setOpen({ isOpen: false, id: "" });
				}}
				contentStyle={{
					borderRadius: "10px",
					width: "845px",
					height: "300px",
				}}>
				<div className={Style.deletePopup}>
					<h1>
						Are you confirm <br /> you want to delete ?
					</h1>
					<div>
						<button onClick={deleteQuize}>Confirm Delete</button>
						<button
							onClick={() => {
								setOpen({ isOpen: false, id: "" });
							}}>
							Cancel
						</button>
					</div>
				</div>
			</Popup>
		</>
	);
};
export default DeletePopup;
