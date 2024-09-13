import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/argentBankLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/loginSlice';
import { useEffect } from 'react';
import { fetchUser, resetUser } from './slices/profileSlice';
import { UpdateName } from '../features/UpdateName';
import { toggleUpdateForm } from '../features/updateNameSlice';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userState = useSelector(state => state.user);
	const { user, status, error } = userState;

	const { formState } = useSelector(state => state.update);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchUser());
		}
	}, [dispatch, status, user]);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(resetUser());
		navigate('/');
	};

	const toggleForm = () => {
		dispatch(toggleUpdateForm());
	};

	// Chargement en cours
	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	// Erreur de chargement données
	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	// Si pas de données utilisateur
	if (!user) {
		return <div>No user data available</div>;
	}

	return (
		<Container>
			<nav className="main-nav">
				<Link className="main-nav-logo" to="/">
					<img
						className="main-nav-logo-image"
						src={logo}
						alt="Argent Bank Logo"
					/>
					<h1 className="sr-only">Argent Bank</h1>
				</Link>
				<div>
					<Link className="main-nav-item" to="/profile">
						<i className="fa fa-user-circle"></i>
						{user.firstName ?? 'Unknown'}
					</Link>
					<p className="main-nav-item" onClick={handleLogout}>
						<i className="fa fa-sign-out"></i>
						Sign Out
					</p>
				</div>
			</nav>
			<main className="main bg-dark">
				<div className="header">
					<h1>
						Welcome back
						<br />
						{`${user.firstName} ${user.lastName}` ?? 'Unknown'}
					</h1>
					<button className="edit-button" onClick={toggleForm}>
						Edit Name
					</button>
					<UpdateName className={formState} />
				</div>
				<h2 className="sr-only">Accounts</h2>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Checking (x8349)</h3>
						<p className="account-amount">{user.balance ?? '$2,082.79'}</p>{' '}
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Savings (x6712)</h3>
						<p className="account-amount">{user.lol ?? '$10,928.42'}</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
						<p className="account-amount">{user.lol ?? '$184.30'}</p>
						<p className="account-amount-description">Current Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
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

export default ProfilePage;
