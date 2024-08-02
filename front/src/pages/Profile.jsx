import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import images and icons
import logo from '../img/argentBankLogo.png';
import money from '../img/icon-money.png';
import chat from '../img/icon-chat.png';
import security from '../img/icon-security.png';

const ProfilePage = ({ user }) => {
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
						{user ?? 'Unknown'}
					</Link>
					<Link className="main-nav-item" to="/">
						<i className="fa fa-sign-out"></i>
						Sign Out
					</Link>
				</div>
			</nav>
			<main className="main bg-dark">
				<div className="header">
					<h1>
						Welcome back
						<br />
						{user ?? 'Unknown'}
					</h1>
					<button className="edit-button">Edit Name</button>
				</div>
				<h2 className="sr-only">Accounts</h2>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Checking (x8349)</h3>
						<p className="account-amount">{user ?? 'Unknown'}</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Savings (x6712)</h3>
						<p className="account-amount">{user ?? 'Unknown'}</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
						<p className="account-amount">{user ?? 'Unknown'}</p>
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
