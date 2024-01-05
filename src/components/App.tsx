import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoginPage from './LoginPage';
import ProfileButton from "./ProfileButton";
import Confirmation from "./Confirmation";
import RegistrationPage from './RegistrationPage';
import {MainPage} from "./MainPage";
import ProfilePage from "./ProfilePage";
import OrderPage from "./OrderPage";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const userId = localStorage.getItem('userId');

		if (userId) {
			setIsAuthenticated(true);
        }
	});

    const handleAuthentication = (status: any) => {
		if (!status) {
			localStorage.removeItem('userId');
		}
        setIsAuthenticated(status);

    };

    return (
        <Router>
				<div className='wrapper'>
					<header className="header">
						<div className="container">
							<nav>
								{isAuthenticated ? (
									<>
										<button className='header-button' onClick={() => handleAuthentication(false)}>Вийти</button>
										<ProfileButton />
									</>
								) : (
									<>
										<li><Link to="/login" className="nav-link">Увійти</Link></li>
										<li><Link to="/register" className="nav-link">Зареєструватись</Link></li>
									</>
								)}
							</nav>
						</div>
					</header>
					<div className="body">
						<div className="container">
							{
								!isAuthenticated ? (
									<>
										<h1>Car sharing service</h1>
										<Routes>
											<Route path="/login" element={<LoginPage onLogin={() => handleAuthentication(true)} />} />
											<Route path="/register" element={<RegistrationPage />} />
										</Routes>
									</>
									) : (
									<Routes>
										<Route path="/main" element={<MainPage />} />
										<Route path="/profile" element={<ProfilePage />} />
										<Route path="/order" element={<OrderPage />} />
										<Route path="/confirmation" element={<Confirmation />} />
									</Routes>
								)
							}
							
						</div>
					</div>
					<footer className="main-footer">
						<div className="container">
							Footer		
						</div>										
					</footer>
				</div>

        </Router>
    );
}

export default App;
