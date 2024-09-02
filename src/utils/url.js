// utils/url.js

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://quiz-backend-nxpv.onrender.com"
		: "http://localhost:10000";

export default baseURL;
