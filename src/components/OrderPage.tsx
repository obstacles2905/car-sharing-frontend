import React, {useState} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/OrderPageStyles.css';
import moment from "moment";

function OrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, rentDays } = location.state || {};

	const [isNotEnoughMoney, setIsNotEnoughMoney] = useState(false);

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
						if ( response.status === 403 ) {
							setIsNotEnoughMoney(true);
						}

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
			<h1 className="order-title">Оформлення замовлення</h1>
			<img className="car-image" src={car.photoUrl} alt={`${car.brand} ${car.model}`} />

			<h2 className="car-name">{car.brand} {car.model}</h2>
			<div className="car-details">
				<h3>Рік випуску: {car.year}</h3>
				<h3>Пробіг: {car.mileage}км</h3>
				<h3>Тип палива: {car.fuelType}</h3>
				<h3>Стан авто: {car.condition}</h3>
				<h3>Днів оренди: {rentDays}</h3>
				<h3>Дата завершення оренди: {moment().add(rentDays, 'days').format('DD-MM-YYYY HH:mm:ss')}</h3>
				<h3>Сумма замовлення: {Number(car.rentPrice) * Number(rentDays)}$</h3>
			</div>

			{isNotEnoughMoney? (
				<p className="error-text">
					<span>На вашому балансі не вистачає коштів</span> <br />
					<Link className='confirm-rent-button' to={'/profile'}>
						Поповнити рахунок
					</Link>
				</p>
			) : ("")}

			<button className="confirm-rent-button" onClick={handleConfirmRent}>Підтвердити оренду</button>
		</div>
    );
}

export default OrderPage;
