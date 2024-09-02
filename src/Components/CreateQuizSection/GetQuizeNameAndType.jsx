import React, { useState } from "react";
import Style from "../../Styles/CreateQuiz/getQuizeNameAndType.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const GetQuizeNameAndType = ({ sendNameType, changePopup }) => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		name: "",
		quizeType: "",
	});

	const continueHandler = (e) => {
		e.preventDefault();

		if (data.name && data.quizeType && data.name.length <= 10) {
			sendNameType(data);
			changePopup("question");
		} else if (data.name.length > 10) {
			toast.error("Name should be less than 10 characters");
		} else {
			toast.error("Please enter a name");
		}
	};

	//function to handle cancel button
	const cancelHandler = () => {
		navigate("/dashboard");
	};

	return (
		<>
			<div className="container">
				<div
					style={{ backgroundColor: "#fff" }}
					className={Style.createNameContainer}>
					<form className={Style.createNameForm}>
						<div>
							<input
								type="text"
								onChange={(e) => {
									setData({ ...data, name: e.target.value });
								}}
								placeholder="Quize Name"
							/>
						</div>
						<div>
							<label>Quize Type</label>

							<h2
								className={data.quizeType == "QnA" ? Style.bgGrn : ""}
								onClick={() => {
									setData({ ...data, quizeType: "QnA" });
								}}>
								{" "}
								Q & A
							</h2>
							<h2
								className={data.quizeType == "poll" ? Style.bgGrn : ""}
								onClick={() => {
									setData({ ...data, quizeType: "poll" });
								}}>
								{" "}
								Poll Type
							</h2>
						</div>

						<div className={Style.buttons}>
							<button className="cancelBtn" onClick={cancelHandler}>
								Cancel
							</button>
							<button className={Style.bgGrn} onClick={continueHandler}>
								Continue
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default GetQuizeNameAndType;
