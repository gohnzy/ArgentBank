import axios from 'axios';

export const LoginCall = async requestData => {
	const API = 'http://localhost:3001/api/v1/user/login';

	const headers = {
		'Content-Type': 'application/json',
	};

	try {
		// Effectuer la requête POST avec le jeton dans les en-têtes
		const response = await axios.post(API, requestData, { headers });
		return response.data;
	} catch (error) {
		console.error('Error in Login:', error);
		throw error;
	}
};

export const UserDataCall = async () => {
	const token = localStorage.getItem('token');
	const API = 'http://localhost:3001/api/v1/user/profile';

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	try {
		const response = await axios.post(API, {}, { headers });
		return response.data.body;
	} catch (error) {
		console.error("Error in user's data fetch", error);
		throw error;
	}
};

export const UpdateUserCall = async requestData => {
	const token = localStorage.getItem('token');
	const API = 'http://localhost:3001/api/v1/user/profile';

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	try {
		const response = await axios.put(API, requestData, { headers });
		return response.data;
	} catch (error) {
		console.error('Error in data update', error);
		throw error;
	}
};
