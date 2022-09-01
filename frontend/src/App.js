import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';


const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App