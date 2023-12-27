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
            <button onClick={onClose}>Зачинити</button>
            <img src={car.photoUrl} alt={`${car.brand} ${car.model}`} />

            <h2>{car.brand} {car.model}</h2>
            <h3>Рік випуску: {car.year}</h3>
            <h3>Пробіг: {car.mileage}км</h3>
            <h3>Тип палива: {car.fuelType}</h3>
            <h3>Стан авто: {car.condition} {car.model}</h3>
            <h3>Ціна за 1 день оренди: {car.rentPrice}грн</h3>

            <input
                type="number"
                value={rentDays}
                onChange={(e) => setRentDays(Number(e.target.value))}
                min="1"
            />
            <button onClick={handleRent}>орендовать авто</button>
        </div>
    );
};