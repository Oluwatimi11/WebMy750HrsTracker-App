import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./app/pages/auth/register/register.component";
import Login from "./app/pages/auth/login/login.component";
import ResetPassword from "./app/pages/auth/reset-password/reset-password.component";
import ForgotPassword from "./app/pages/auth/forgot-password/forgot-password.component";
import SmoothScroll from "smooth-scroll";
import Dashboard from "./app/layouts/dashboard/dashboard.component";
import MainDashboard from "./app/pages/dashboard/main-dashboard/main-dashboard.components";
import Logs from "./app/pages/dashboard/logs/logs.component";
import Properties from "./app/pages/dashboard/properties/properties.component";
import TeamMembers from "./app/pages/dashboard/team-members/team-members.component";
import ImportHours from "./app/pages/dashboard/import-hours/import-hours.component";
import MembersGroup from "./app/pages/management/members-group/members-group.component";
import Settings from "./app/pages/management/settings/settings.component";
import Support from "./app/pages/management/support/support.component";
import Tips from "./app/pages/management/tips/tips.component";
import RecordTime from "./app/pages/dashboard/record-time/record-time.component";
import { StoreProvider } from "./store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./app/pages/auth/verify-email/verify-email.component";
import ResendVerificationEmail from "./app/pages/auth/resend-verification-email/resend-verification-email.component";
import PrivateRoute from "./app/components/atoms/private-route/private-route-component";
import RegisterTeamMember from "./app/pages/auth/register-team-member/register-team-member.component";


export const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1000,
	speedAsDuration: true,
});

function Main() {

	return (
		<QueryClientProvider client={queryClient}>
			<StoreProvider>
				<Routes>
					{/* Auth */}
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/verify-email" element={<VerifyEmail />} />
					<Route
						path="/resend-verification-email"
						element={<ResendVerificationEmail />}
					/>
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					/>
					<Route
						path="/register-team-member"
						element={<RegisterTeamMember />}
					/>
					<Route path="/members-group" element={<MembersGroup />} />

					{/* Protected Routes */}
					<Route element={<PrivateRoute component={Dashboard} />}>
						<Route
							path="/"
							element={<PrivateRoute component={MainDashboard} />}
						/>
						<Route
							path="logs"
							element={<PrivateRoute component={Logs} />}
						/>
						<Route
							path="properties"
							element={<PrivateRoute component={Properties} />}
						/>
						<Route
							path="team-members"
							element={<PrivateRoute component={TeamMembers} />}
						/>
						<Route
							path="import-hours"
							element={<PrivateRoute component={ImportHours} />}
						/>
						<Route
							path="record-time"
							element={<PrivateRoute component={RecordTime} />}
						/>
						<Route
							path="support"
							element={<PrivateRoute component={Support} />}
						/>
						<Route
							path="settings"
							element={<PrivateRoute component={Settings} />}
						/>
						<Route
							path="tips"
							element={<PrivateRoute component={Tips} />}
						/>
					</Route>
					
					{/* Redirect to the login page if the path doesn't match any of the above */}
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</StoreProvider>
			<ToastContainer
				autoClose={2000}
				closeOnClick
				draggable
				hideProgressBar={false}
				newestOnTop={false}
				pauseOnFocusLoss
				pauseOnHover
				position="top-right"
				rtl={false}
				theme="light"
			/>
		</QueryClientProvider>
	);
}
export default Main;
