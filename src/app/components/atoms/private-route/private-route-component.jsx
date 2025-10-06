import { Navigate, useLocation } from "react-router-dom";
import { LocalStorageKeys } from "../../../constants";
import dayjs from "dayjs";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();

	// Check if the user is authenticated (e.g., by checking the access token in local/session storage)
	const isAuthenticated = () => {
		const accessToken = localStorage.getItem(LocalStorageKeys.TOKEN);
		const tokenExpirationTime = localStorage.getItem(
			LocalStorageKeys.TOKENDURATION
		);

		if (!accessToken || !tokenExpirationTime) {
			return false;
		}

		const tokenExpirationDate = dayjs(tokenExpirationTime);
		const currentDate = dayjs();

		return currentDate.isBefore(tokenExpirationDate);
	};

	return isAuthenticated() ? (
		<Component {...rest} />
	) : (
		<Navigate to={{ pathname: "/login", state: { from: location } }} />
	);
};

export default React.memo(PrivateRoute);
