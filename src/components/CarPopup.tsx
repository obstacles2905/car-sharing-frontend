import React, {useState} from "react";
import {Car} from "../contracts";
import { useNavigate } from 'react-router-dom';

export const CarPopup = ({ car, onClose }: {car: Car, onClose: any}) => {
    const [rentDays, setRentDays] = useState(1);
    const navigate = useNavigate();

    const handleRent = () => {
        navigate('/order', { state: { car, rentDays } }); // Передача данных автомобиля и количества дней на страницу оформления заказа
    };

    if (!car) return null;

    return (
        <div className="car-popup">
			<div className="car-popup-header">
				<button onClick={onClose}>Закрити</button>
			</div>
			<div className="car-popup-content">
				<img src={car.photoUrl} alt={`${car.brand} ${car.model}`} />
				<h2>{car.brand} {car.model}</h2>
				<div className="car-details">
					<h3>Рік випуску: {car.year}</h3>
					<h3>Пробіг: {car.mileage}км</h3>
					<h3>Тип палива: {car.fuelType}</h3>
					<h3>Стан авто: {car.condition}</h3>
					<h3>Ціна за 1 день оренди: {car.rentPrice}$</h3>
				</div>
				<div className="car-rent">
					<input
						type="text" pattern="[0-9]{1,5}"
						value={rentDays}
						onChange={(e) => setRentDays(Number(e.target.value))}
						min="1"
					/>
					<button className="nav-link" onClick={handleRent}>Орендувати авто</button>
				</div>
			</div>
		</div>
    );
};