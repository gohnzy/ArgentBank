import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './slices/loginSlice';
import logo from '../img/argentBankLogo.png';
import '../css/main.css';
import { useEffect } from 'react';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status } = useSelector(state => state.login);

	const handleSubmit = e => {
		e.preventDefault();
		const email = e.currentTarget.email?.value;
		const password = e.currentTarget.password?.value;
		const loginRequestBody = {
			email,
			password,
		};

		dispatch(loginUser(loginRequestBody)).then(action => {
			if (loginUser.fulfilled.match(action)) {
				navigate('/profile');
			}
		});
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/profile');
		}
	}, [navigate]);

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
					<form onSubmit={handleSubmit}>
						<div className="input-wrapper">
							<label htmlFor="username">Username</label>
							<input type="text" id="username" name="email" />
						</div>
						<div className="input-wrapper">
							<label htmlFor="password">Password</label>
							<input type="password" id="password" name="password" />
						</div>
						<div className="input-remember">
							<input type="checkbox" id="remember-me" />
							<label htmlFor="remember-me">Remember me</label>
						</div>
						<button type="submit" className="sign-in-button">
							Sign In
						</button>
					</form>
					{status === 'loading' && (
						<p style={{ color: 'purple' }}>Loading...</p>
					)}
					{status === 'failed' && (
						<p style={{ color: 'red' }}>
							Identifiant ou mot de passe incorrect
						</p>
					)}
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
