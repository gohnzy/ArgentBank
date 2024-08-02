import axios from 'axios';

const Login = async requestData => {
	const API = 'http://localhost:3001/api/v1/user/login';

	// Préparer les en-têtes avec le jeton Bearer
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

export default Login;
