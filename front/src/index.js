import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<Homepage />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/profile" element={<ProfilePage />}></Route>
			</Routes>
		</Router>
	</React.StrictMode>,
);
