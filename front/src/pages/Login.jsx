import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LoginCall from '../calls/calls';

import logo from '../img/argentBankLogo.png';
import '../css/main.css';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = useCallback(e => {
		setEmail(e.target.value);
	}, []);

	const handlePasswordChange = useCallback(e => {
		setPassword(e.target.value);
	}, []);

	const handleClick = useCallback(
		async e => {
			e.preventDefault();
			const loginRequestBody = {
				email: email,
				password: password,
			};
			try {
				const response = await LoginCall(loginRequestBody);
				localStorage.setItem('token', response.token);
				console.log(response);
				navigate('/profile');
			} catch (error) {
				alert("L'adresse mail ou le mot de passe ne sont pas bons");
				console.error(error, '( Wrong email address or password )');
			}
		},
		[email, password, navigate],
	);

	useEffect(() => {
		const testButton = document.getElementById('submitBtn');
		testButton.addEventListener('click', handleClick);

		return () => {
			testButton.removeEventListener('click', handleClick);
		};
	}, [handleClick]);

	return (
		<Container>
			<nav className="main-nav">
				<Link to="/" className="main-nav-logo">
					<img
						className="main-nav-logo-image"
						src={logo}
						alt="Argent Bank Logo"
					/>
					<h1 className="sr-only">Argent Bank</h1>
				</Link>
				<div>
					<Link className="main-nav-item" to="/login">
						<i className="fa fa-user-circle"></i>
						Sign In
					</Link>
				</div>
			</nav>
			<main className="main bg-dark">
				<section className="sign-in-content">
					<i className="fa fa-user-circle sign-in-icon"></i>
					<h1>Sign In</h1>
					<form>
						<div className="input-wrapper">
							<label htmlFor="username">Username</label>
							<input type="text" id="username" onChange={handleEmailChange} />
						</div>
						<div className="input-wrapper">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								onChange={handlePasswordChange}
							/>
						</div>
						<div className="input-remember">
							<input type="checkbox" id="remember-me" />
							<label htmlFor="remember-me">Remember me</label>
						</div>
						<Link to="/profile" className="sign-in-button" id="submitBtn">
							Sign In
						</Link>
					</form>
				</section>
			</main>
			<footer className="footer">
				<p className="footer-text">Copyright 2020 Argent Bank</p>
			</footer>
		</Container>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export default LoginPage;
