//Home page of the application
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../Components/SideMenuSection/SideMenu";
import { useEffect } from "react";

const HomePage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const jwtToken = localStorage.getItem("authToken");
		if (!jwtToken) {
			navigate("/auth");
		} else {
			navigate("/dashboard");
		}
	}, []);

	return (
		<>
			<div>Home Page</div>
			<div style={{ display: "flex", height: "100vh" }}>
				<div>
					<SideMenu />
				</div>
				<div
					style={{ width: "83%", height: "100%", backgroundColor: "#EDEDED" }}>
					<Outlet />
				</div>
			</div>
		</>
	);
};
export default HomePage;
