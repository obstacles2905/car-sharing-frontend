import { Link } from 'react-router-dom';
import '../styles/AuthFormStyles.css';

function Navigation() {
    return (
        <ul className="nav-links">
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
    );
}

export default Navigation;
