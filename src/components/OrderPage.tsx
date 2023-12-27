import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderPageStyles.css';
import moment from "moment";

function OrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, rentDays } = location.state || {};

    if (!car) return <p>Автомобиль не выбран</p>;

    const endDate = moment().add(rentDays, 'days').format('DD-MM-YYYY HH:mm:ss');
    const totalAmount = Number(car.rentPrice) * Number(rentDays);

    const handleConfirmRent = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch('http://localhost:8080/orders/start-rent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    carId: car.id,
                    daysAmount: rentDays
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error in starting rent');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Order confirmed', data);
                    navigate('/confirmation'); // Перенаправление на страницу подтверждения заказа
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="order-details">
            <h1>Оформлення замовлення</h1>
            <img src={car.photoUrl} alt={`${car.brand} ${car.model}`} />

            <h2>{car.brand} {car.model}</h2>
            <h3>Рік випуску: {car.year}</h3>
            <h3>Пробіг: {car.mileage}км</h3>
            <h3>Тип палива: {car.fuelType}</h3>
            <h3>Стан авто: {car.condition}</h3>
            <h3>Днів оренди: {rentDays} </h3>
            <h3>Дата завершення оренди: {moment().add(rentDays, 'days').format('DD-MM-YYYY HH:mm:ss')} </h3>
            <h3>Сумма замовлення: {Number(car.rentPrice) * Number(rentDays)}грн </h3>

            <button onClick={handleConfirmRent}>Підтвердити оренду</button>
        </div>
    );
}

export default OrderPage;
