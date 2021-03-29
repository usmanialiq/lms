import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import "./static/style.css";

// Utitlity Functions
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./config/redux/actions/auth";

// Store - Redux
import store from "./config/redux/store";
import Routes from "./config/routes/client";
import ClientRoute from "./config/routes/helper";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get User Info
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Log out the user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = ClientRoute("sign-in");
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;