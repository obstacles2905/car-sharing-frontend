import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';
import {Link} from "react-router-dom";
function ProfilePage() {
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [balance, setBalance] = useState(0);

    const fetchBalance = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:8080/users/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("DATA", data);
                    setBalance(data.balance); // Предполагаем, что баланс находится в data.balance
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    };

    useEffect(() => {
        fetchBalance();
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
                    // Обновляем баланс после успешного пополнения
                    fetchBalance();
                    setShowDepositForm(false);
                    setDepositAmount('');
                })
                .catch(error => {
                    console.error('Error during deposit operation:', error);
                });
        }
    };

    return (
        <div>
            <h1>Личный кабинет</h1>
            <p>Текущий баланс: {balance}</p>

            <Link to="/main" className="link-button">Главная страница</Link>

            {showDepositForm ? (
                <div className="deposit-form">
                    <div className="deposit-title">Пополнение баланса</div>
                    <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Сумма для пополнения"
                    />
                    <button onClick={handleDeposit}>Пополнить счет</button>
                </div>
            ) : (
                <button onClick={() => setShowDepositForm(true)} style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Пополнить баланс
                </button>
            )}
        </div>
    );
}

export default ProfilePage;
