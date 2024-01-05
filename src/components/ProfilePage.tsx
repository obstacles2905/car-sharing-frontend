import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';
import {Link} from "react-router-dom";
function ProfilePage() {
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [balance, setBalance] = useState(0);
    const [activeOrders, setActiveOrders] = useState([]);

    const fetchBalanceAndOrders = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:8080/users/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setBalance(data.balance);
                })
                .catch(error => console.error('Error fetching balance:', error));

            fetch(`http://localhost:8080/orders/active-orders?userId=${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("DATA", data);
                    setActiveOrders(data.activeOrders);
                })
                .catch(error => console.error('Error fetching orders:', error));
        }
    };

    useEffect(() => {
        fetchBalanceAndOrders();
    }, []);

    const handleDeposit = () => {
        const userId = localStorage.getItem('userId');
        if (userId && depositAmount) {
            fetch('http://localhost:8080/balance/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId, amount: depositAmount })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    fetchBalanceAndOrders();
                    setShowDepositForm(false);
                    setDepositAmount('');
                })
                .catch(error => {
                    console.error('Error during deposit operation:', error);
                });
        }
    };

	const hideDepositForm = () => {
		setShowDepositForm(false);
	};

    return (
        <div>
            <h1>Особистий кабінет</h1>
            <p>Ваш баланс: {balance}</p>

			<div className="profile-buttons">
				<Link to="/main" className="link-button">Головна сторінка</Link>
				<button onClick={() => setShowDepositForm(true)}>
						Поповнити баланс
				</button>
				
			</div>
			{showDepositForm ? (
					<div className="deposit-form">
						<div className="deposit-head">
							<div className="deposit-title">Поповнення балансу</div>
						</div>
						<input
							type="number"
							value={depositAmount}
							onChange={(e) => setDepositAmount(e.target.value)}
							placeholder="Сумма для пополнения"
						/>
						<button onClick={handleDeposit}>Підтвердити</button>
						<button onClick={() => hideDepositForm()}>Назад</button>
					</div>
				):('')}

            <div>
                <h2>Активні замовлення</h2>
                {activeOrders.length > 0 ? (
                    activeOrders.map((order: any) => (
                        <div key={order.id}>
                            <h4>Замовлення №{order.id} {order.status}</h4>
                            {/* Отображение деталей заказа */}
                        </div>
                    ))
                ) : (
                    <p>Немає активних замовлень.</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
