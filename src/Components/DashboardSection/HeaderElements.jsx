import React from "react";
import { getFormatedNo } from "../../utils/HelperFunc";
import Style from "../../Styles/Dashboard/headerElements.module.css";

const HeaderElements = ({ info }) => {
	return (
		<>
			<div className={Style.headerElement}>
				<div>
					<h1>
						{getFormatedNo(info.totalQuizes)}
						<span>Quiz</span>
					</h1>
					<h2>Created</h2>
				</div>

				<div>
					<h1>
						{getFormatedNo(info.totalQuestions)}
						<span>Questions</span>
					</h1>
					<h2>Created</h2>
				</div>

				<div>
					<h1>
						{getFormatedNo(info.totalImpressions)}
						<span>Total</span>
					</h1>
					<h2>Impressions</h2>
				</div>
			</div>
		</>
	);
};

export default HeaderElements;
