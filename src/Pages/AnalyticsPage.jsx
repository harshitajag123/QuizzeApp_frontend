import React from "react";
import AnalyticsContainer from "../Components/AnalyticsSection/AnalyticsContainer";
import SideMenu from "../Components/SideMenuSection/SideMenu";
const AnalyticsPage = () => {
	return (
		<>
			<div style={{ display: "flex" }}>
				<SideMenu />
				<AnalyticsContainer />
			</div>
		</>
	);
};
export default AnalyticsPage;
