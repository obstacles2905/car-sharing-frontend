import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import {MainPage} from "./MainPage";
import ProfilePage from "./ProfilePage";
import OrderPage from "./OrderPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthentication = (status: any) => {
        setIsAuthenticated(status);
    };

    return (
        <Router>
            <div>
                <nav>
                    {isAuthenticated ? (
                        <>
                            <button onClick={() => handleAuthentication(false)}>Logout</button>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="nav-link">Login</Link></li>
                            <li><Link to="/register" className="nav-link">Register</Link></li>
                        </>
                    )}
                </nav>

                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={() => handleAuthentication(true)} />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/order" element={<OrderPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
