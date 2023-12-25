import React, {useEffect} from 'react';
import '../styles/MainPageStyles.css';
import ProfileButton from "./ProfileButton";
import {useNavigate} from "react-router-dom";

export function MainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="main-container">
            <nav className="top-nav">
                <div className="nav-right">
                    <ProfileButton />
                </div>
            </nav>

            <div className="hero-section">
                <h1>Welcome to Car Sharing App</h1>
                {/* Герой-раздел с изображением и приветственным текстом */}
            </div>

            <div className="cars-showcase">
                {/* Раздел с демонстрацией автомобилей или специальных предложений */}
            </div>

            <footer className="main-footer">
                {/* Футер с контактной информацией и ссылками */}
            </footer>
        </div>
    );
}

export default MainPage;
