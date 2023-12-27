import React, { useState, useEffect } from 'react';
import '../styles/MainPageStyles.css';
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import {CarPopup} from "./CarPopup";
import {Car} from "../contracts";

export function MainPage() {
    const navigate = useNavigate();
    const [cars, setCars]: [Car[], any] = useState([]);
    const [selectedCar, setSelectedCar]: [any, any] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
        }

        fetch('http://localhost:8080/cars')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error('Error:', error));
    }, [navigate]);

    const handleCarClick = (car: any) => {
        setSelectedCar(car);
    };

    return (
        <div className="main-container">
            <nav className="top-nav">
                <div className="nav-right">
                    <ProfileButton />
                </div>
            </nav>

            <div className="cars-showcase">
                <h2>Доступні авто</h2>
                <div className="cars-grid">
                    {cars.map((car: Car) => (
                        <div key={car.id} className="car-card" onClick={() => handleCarClick(car)}>
                            <img src={car.photoUrl} alt={`${car.brand} ${car.model}`} />
                            <h3>{car.brand} {car.model}</h3>
                            <p>Год: {car.year}</p>
                            <p>Цвет: {car.color}</p>
                            {/* Другие детали автомобиля */}
                        </div>
                    ))}
                </div>
            </div>
            <CarPopup car={selectedCar} onClose={() => setSelectedCar(null)} />

            <footer className="main-footer">
                {/* Футер с контактной информацией и ссылками */}
            </footer>
        </div>
    );
}

export default MainPage;