//Toggles between SignUp and Login components based on user interaction.

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUp from "../Components/AuthSection/SignUp";
import Login from "../Components/AuthSection/Login";
import { useState, useEffect } from "react";

const AuthScreen = () => {
	const navigate = useNavigate();
	const location = useLocation(); // To get the current location
	const [authType, setAuthType] = useState("signup");

	const changeTypeFun = (val) => {
		setAuthType(val);
	};

	// Set authType based on the current path
	useEffect(() => {
		if (location.pathname === "/login") {
			setAuthType("login");
		} else {
			setAuthType("signup");
		}
	}, [location.pathname]);

	// Redirect if the user is already logged in
	useEffect(() => {
		const jwtToken = localStorage.getItem("authToken");
		if (jwtToken && location.pathname.startsWith("/auth")) {
			navigate("/dashboard");
		}
	}, [navigate, location.pathname]); // Added location.pathname as dependency

	return (
		<>
			{authType == "signup" ? (
				<SignUp authType={authType} changeType={changeTypeFun} />
			) : (
				<Login authType={authType} changeType={changeTypeFun} />
			)}
		</>
	);
};

export default AuthScreen;
