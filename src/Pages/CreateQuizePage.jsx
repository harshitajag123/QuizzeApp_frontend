import React from "react";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupCompleted from "../Components/CreateQuizSection/PopupCompleted";
import GetAllQues from "../Components/CreateQuizSection/GetAllQues";
import GetQuizeNameAndType from "../Components/CreateQuizSection/GetQuizeNameAndType";
import { quizeInfo } from "../utils/DummyObj/quize";
import AnalyticsPage from "../Pages/AnalyticsPage";

const CreateQuizePage = ({ quizeInfor = {}, type = "create" }) => {
	const [quizeData, setQuizeData] = useState(quizeInfo);
	const [isOpen, setIsOpen] = useState(true);
	const [currentPopup, setCurrentPopup] = useState("nameType");
	const [url, setUrl] = useState("");

	const nameTypeReceiver = (data) => {
		setQuizeData({ ...quizeData, ...data });
	};
	const popupChanger = (val) => {
		setCurrentPopup(val);
	};

	useEffect(() => {
		if (type == "update" && quizeInfo) {
			setQuizeData(quizeInfor);
			setCurrentPopup("question");
		}
	}, [type]);

	return (
		<>
			<div>
				<AnalyticsPage
					style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
				/>
				<div>
					<Popup
						open={isOpen}
						closeOnDocumentClick
						onClose={() => {
							setIsOpen(false);
						}}
						contentStyle={{ borderRadius: "10px" }}>
						{currentPopup == "nameType" ? (
							<GetQuizeNameAndType
								sendNameType={nameTypeReceiver}
								changePopup={popupChanger}
							/>
						) : currentPopup == "question" ? (
							<GetAllQues
								setUrl={setUrl}
								changePopup={popupChanger}
								quizeData={quizeData}
								type={type}
							/>
						) : (
							<PopupCompleted url={url} changePopup={popupChanger} />
						)}
					</Popup>
				</div>
			</div>
		</>
	);
};

export default CreateQuizePage;
