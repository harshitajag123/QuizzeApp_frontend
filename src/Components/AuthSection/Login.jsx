//Manages user login, form validation, and authentication via JWT token.

import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButtons from "../../utils/LoadingButtons";
import Style from "../../Styles/auth/authScreen.module.css";
import { useNavigate } from "react-router-dom";
import baseURL from "../../utils/url";

const Login = ({ authType, changeType }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [authData, setAuthData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		emailError: "",
		passwordError: "",
	});

	//function to validate the data
	const validateAuthData = () => {
		const err = {
			emailError: "",
			passwordError: "",
		};
		let validated = false;

		if (!authData.email) {
			err.emailError = "Email is required!";
		} else if (!/\S+@\S+\.\S+/.test(authData.email)) {
			err.emailError = "Email is invalid!";
		}

		if (!authData.password) {
			err.passwordError = "Password is required!";
		}

		if (!err.emailError && !err.passwordError) {
			validated = true;
			setErrors({
				emailError: "",
				passwordError: "",
			});
		} else {
			setErrors(err);
		}
		return validated;
	};

	//function to handle input elements change state
	const onInputChange = (e) => {
		const { name, value } = e.target;
		setAuthData({ ...authData, [name]: value });
	};

	//function ro handle submit signup from if there is no error
	const onSubmitFun = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (validateAuthData()) {
			try {
				//url used
				const { data } = await axios.post(
					`${baseURL}/api/user/login`,
					authData
				);

				//saving the jwttoken in localStorage
				localStorage.setItem("authToken", data.jwtToken);
				toast.success(data.message);
				navigate("/");
			} catch (error) {
				toast.error(error.response.data.error);
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
					<h1>QUIZZE</h1>
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
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								className={errors.emailError ? Style.error : ""}
								onChange={onInputChange}
							/>
						</div>
						<div className={Style.error}>
							{errors.emailError && <p>{errors.emailError}</p>}
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								className={errors.passwordError ? Style.error : ""}
								onChange={onInputChange}
							/>
						</div>

						<div className={Style.error}>
							{errors.passwordError && <p>{errors.passwordError}</p>}
						</div>

						{loading ? (
							<LoadingButtons />
						) : (
							<button type="submit">Log-in</button>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
