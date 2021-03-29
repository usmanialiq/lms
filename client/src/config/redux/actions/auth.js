import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { login } from "../../routes/server";

// Login - Get User Token
export const loginUser = userData => dispatch => {
	axios
		.post(login, userData)
		.then(res => {
			// Save to local storage
			const { token, user } = res.data;

			// Set Token to local storage
			localStorage.setItem("jwtToken", token);
			localStorage.setItem("name", user.name);
			localStorage.setItem("type", user.type);

			// Set Token to auth header
			setAuthToken(token);

			// Decode Token to get User Data
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => {
			if (err.message === "Network Error") {
				dispatch({
					type: GET_ERRORS,
					payload: { message: err.message },
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			}
		});
};

// Set Logged in User
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// Log Uer Out
export const logoutUser = () => dispath => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	localStorage.removeItem("name");
	localStorage.removeItem("type");

	// remove auth header for future requests
	setAuthToken(false);
	// set the current user to {} which will also set isAuthenticated: false
	dispath(setCurrentUser({}));
};