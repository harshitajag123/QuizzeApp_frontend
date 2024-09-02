import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import AuthScreen from "./Pages/AuthScreen";
import HomePage from "./Pages/HomePage";
import AnalyticsPage from "./Pages/AnalyticsPage";
import MainDashboard from "./Pages/MainDashboard";
import CreateQuizePage from "./Pages/CreateQuizePage";
import QuizEditPage from "./Pages/QuizEditPage";
import QueWiseAnalysisPage from "./Pages/QueWiseAnalysisPage";
import QuizInterfacePage from "./Pages/QuizInterfacePage";

import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<Router>
				<Routes>
					{/* <Route path="/auth" element={<AuthScreen />} /> */}
					<Route path="/auth/*" element={<AuthScreen />} />
					<Route path="/login" element={<AuthScreen authType="login" />} />
					<Route path="/" element={<HomePage />} />
					<Route path="/anonymous/:id" element={<QuizInterfacePage />} />
					<Route path="/dashboard" element={<MainDashboard />} />
					<Route path="/analytics" element={<AnalyticsPage />} />
					<Route path="/create-quize" element={<CreateQuizePage />} />
					<Route path="/analytics/edit-quize/:id" element={<QuizEditPage />} />
					<Route
						path="/analytics/q-analysis/:id"
						element={<QueWiseAnalysisPage />}
					/>

					{/* Redirect unknown routes to home or a 404 page */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<ToastContainer position="top-right" autoClose={2500} />
			</Router>
		</>
	);
}

export default App;
