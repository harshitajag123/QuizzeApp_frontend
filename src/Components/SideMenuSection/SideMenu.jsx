import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "../../Styles/SideMenu/SideMenu.module.css";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SideMenu = () => {
	const navigate = useNavigate();
	const [currentNav, setCurrentNav] = useState("dashboard");

	const segments = window.location.pathname.split("/");

	useEffect(() => {
		const firstSegment = segments[1];
		setCurrentNav(firstSegment);
	}, [segments]);

	const logoutHandler = () => {
		localStorage.removeItem("authToken");
		navigate("/auth");
		toast.success("Logged out successfully");
	};
	return (
		<>
			<div className={Style.sidebarcontainer}>
				<h1>QUIZZE</h1>
				<div className={Style.navlinks}>
					<Link
						to={"/dashboard"}
						className={currentNav == "dashboard" ? Style.hoverEffect : ""}
						onClick={() => {
							setCurrentNav("dashboard");
						}}>
						DashBoard
					</Link>

					<Link
						to={"/analytics"}
						className={currentNav == "analytics" ? Style.hoverEffect : ""}
						onClick={() => {
							setCurrentNav("analytics");
						}}>
						Analytics
					</Link>

					<Link
						to={"/create-quize"}
						className={currentNav == "create-quiz" ? Style.hoverEffect : ""}
						onClick={() => {
							setCurrentNav("create-quiz");
						}}>
						Create Quiz
					</Link>
				</div>

				<h2 onClick={logoutHandler}>LOGOUT</h2>
			</div>
		</>
	);
};

export default SideMenu;
