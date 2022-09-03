import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import store from './config/store';
import setAuthToken from './config/setAuthToken';
import { setCurrentUser, logout } from './actions/authActions';


// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';


const App = () => {
	const navigate = useNavigate();

	// Checking if the user is authenticated
	if (localStorage.jwtToken) {
		// Set Authorization Header
		setAuthToken(localStorage.jwtToken);

		// Decode token and get user info
		const decoded = jwt_decode(localStorage.jwtToken);
		// Set Current User
		store.dispatch(setCurrentUser(decoded));

		// Check for expired token
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			// Logout user
			store.dispatch(logout(navigate));
		}
	}


	return (
		<Provider store={store}>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/logout" element={<Logout />} />
			</Routes>
			<Footer />
		</Provider>
	)
}

export default App