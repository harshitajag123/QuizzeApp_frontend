import React from "react";
import { getFormatedDate } from "../../utils/HelperFunc";
import Style from "../../Styles/QuesAnalysis/quesAnalysis.module.css";

const PollQueAnalysis = ({ pollData }) => {
	// Add a check to ensure pollData exists
	if (!pollData) {
		return <div>Loading...</div>; // Display a loading message or any placeholder content
	}

	return (
		<>
			<div className={Style.analysisContainer}>
				<div>
					<h1>{pollData.name} Question Analysis</h1>
					<div>
						<p>Created On : {`${getFormatedDate(pollData.createdAt)}`}</p>
						<p>Impressions : {`${pollData.impressions}`}</p>
					</div>
				</div>
				<div>
					{pollData.pollQuestions?.map((q, i) => (
						<div key={i}>
							<h1> Q.{`${i + 1} ${q.ques}`} </h1>
							<div>
								{q.options.map((op, j) => (
									<div className={Style.pollContainer} key={j}>
										<h1>{op.totalChoosed}</h1>
										<p>{`option ${j + 1}`}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default PollQueAnalysis;
