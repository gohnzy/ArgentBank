import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../css/main.css';

// import images and icons
import logo from '../img/argentBankLogo.png';
import money from '../img/icon-money.png';
import chat from '../img/icon-chat.png';
import security from '../img/icon-security.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './slices/loginSlice';
import { resetUser } from './slices/profileSlice';
function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.user.user);
	const state = useSelector(state => state.login);
	const handleLogout = () => {
		dispatch(logout());
		dispatch(resetUser());
		navigate('/');
	};
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
				{state.isAuthenticated ? (
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
				) : (
					<Link to={'/login'} className="main-nav-item">
						<i className="fa fa-user-circle"></i>
						Sign In
					</Link>
				)}
			</nav>
			<main>
				<div className="hero">
					<section className="hero-content">
						<h2 className="sr-only">Promoted Content</h2>
						<p className="subtitle">No fees.</p>
						<p className="subtitle">No minimum deposit.</p>
						<p className="subtitle">High interest rates.</p>
						<p className="text">
							Open a savings account with Argent Bank today!
						</p>
					</section>
				</div>
				<section className="features">
					<h2 className="sr-only">Features</h2>
					<div className="feature-item">
						<img src={chat} alt="Chat Icon" className="feature-icon" />
						<h3 className="feature-item-title">You are our #1 priority</h3>
						<p>
							Need to talk to a representative? You can get in touch through our
							24/7 chat or through a phone call in less than 5 minutes.
						</p>
					</div>
					<div className="feature-item">
						<img src={money} alt="Chat Icon" className="feature-icon" />
						<h3 className="feature-item-title">
							More savings means higher rates
						</h3>
						<p>
							The more you save with us, the higher your interest rate will be!
						</p>
					</div>
					<div className="feature-item">
						<img src={security} alt="Chat Icon" className="feature-icon" />
						<h3 className="feature-item-title">Security you can trust</h3>
						<p>
							We use top of the line encryption to make sure your data and money
							is always safe.
						</p>
					</div>
				</section>
			</main>
			<footer className="footer">
				<p className="footer-text">Copyright 2020 Argent Bank</p>
			</footer>
		</Container>
	);
}

const Container = styled.div`
	height: fit-content;
	width: 100%;
`;

export default App;
