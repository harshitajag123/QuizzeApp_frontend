// //Handles user registration, including form validation and submission.

import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingButtons from "../../utils/LoadingButtons";
import Style from "../../Styles/auth/authScreen.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import baseURL from "../../utils/url";

const SignUp = ({ authType, changeType }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [authData, setAuthData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		nameError: "",
		emailError: "",
		passwordError: "",
		conPasswordError: "",
	});

	//function to validate the data
	const validateAuthData = () => {
		const err = {
			nameError: "",
			emailError: "",
			passwordError: "",
			conPasswordError: "",
		};
		let validated = false;

		if (!authData.name) {
			err.nameError = "Invalid name";
		} else if (authData.name.length < 3) {
			err.nameError = "Name must be at least 3 characters long";
		}

		if (!authData.email) {
			err.emailError = "Invalid Email";
		} else if (!/\S+@\S+\.\S+/.test(authData.email)) {
			err.emailError = "Email is invalid!";
		}

		if (!authData.password) {
			err.passwordError = "Weak password";
		} else if (authData.password.length < 6) {
			err.passwordError = "Password must be at least 6 characters long";
		}

		if (!authData.confirmPassword) {
			err.conPasswordError = "password doesn’t match";
		} else if (authData.confirmPassword.length < 6) {
			err.conPasswordError =
				"Confirm Password must be at least 6 characters long";
		} else if (authData.password !== authData.confirmPassword) {
			err.conPasswordError = "Password and Confirm Password must be the same!";
		}

		if (
			!err.nameError &&
			!err.emailError &&
			!err.passwordError &&
			!err.conPasswordError
		) {
			validated = true;
			setErrors({
				nameError: "",
				emailError: "",
				passwordError: "",
				conPasswordError: "",
			});
		} else {
			setErrors(err);
		}

		return validated;
	};

	//function to handle input element change state
	const onInputChange = (e) => {
		const { name, value } = e.target;
		setAuthData({ ...authData, [name]: value });
	};

	//function to submit the signup form if there is no error
	const onSubmitFun = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validateAuthData()) {
			try {
				//url used
				const response = await axios.post(
					`${baseURL}/api/user/signup`,
					authData
				);
				// const { data } = await axios.post(
				// 	`${baseURL}/api/user/signup`,
				// 	authData
				// );
				if (response && response.data) {
					navigate("/login");
					toast.success(response.data.message);
				} else {
					toast.error("Unexpected response format");
				}
			} catch (error) {
				toast.error(error.response.data.error);
				// Consider logging the error to the console
				console.error(error);
				// Refresh the page after an error occurs
				window.location.reload();
			}
		}
		setLoading(false);
	};

	return (
		<>
			<div className={Style.authWrapper}>
				<div className={Style.authCard}>
					<h1>QUIZZIE</h1>
					<div className={Style.authType}>
						<p
							className={authType === "signup" ? Style.authTypeHover : ""}
							onClick={() => {
								changeType("signup");
							}}>
							Sign Up
						</p>
						<p
							className={authType === "login" ? Style.authTypeHover : ""}
							onClick={() => {
								changeType("login");
							}}>
							Log In
						</p>
					</div>
					<form onSubmit={onSubmitFun}>
						<div style={{ marginTop: "100px" }}>
							<label htmlFor="name">Name</label>
							<input
								name="name"
								type="text"
								id="name"
								className={errors.passwordError ? Style.error : ""}
								onChange={onInputChange}
							/>
						</div>
						<div className={Style.error}>
							{errors.nameError && <p>{errors.nameError}</p>}
						</div>

						<div>
							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="text"
								id="email"
								className={errors.passwordError ? Style.error : ""}
								onChange={onInputChange}
							/>
						</div>
						<div className={Style.error}>
							{errors.emailError && <p>{errors.emailError}</p>}
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<input
								name="password"
								type="password"
								id="password"
								className={errors.passwordError ? Style.error : ""}
								onChange={onInputChange}
							/>
						</div>
						<div className={Style.error}>
							{errors.passwordError && <p>{errors.passwordError}</p>}
						</div>

						<div>
							<label htmlFor="conPassword">Confirm Password</label>
							<input
								name="confirmPassword"
								type="password"
								id="conpassword"
								className={errors.passwordError ? Style.error : ""}
								onChange={onInputChange}
							/>
						</div>
						<div className={Style.error}>
							{errors.conPasswordError && <p>{errors.conPasswordError}</p>}
						</div>

						{loading ? (
							<LoadingButtons />
						) : (
							<button type="submit">Sign-Up</button>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default SignUp;
