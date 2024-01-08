import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';
import { Link } from 'react-router-dom';
import OrderHistory from './OrderHistory';
interface Order {
  status: string;
  carId: number;
  id: number;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  startTime: string;
  cost: number;
  dropOffLocation: string;
  wrapperStyle?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
}

interface UserData {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	balance: string;
}

function ProfilePage() {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [history, setHistory] = useState<Order[]>([]);
  const [depositAmount, setDepositAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const userId = localStorage.getItem('userId');

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/orders/active-orders?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok while fetching rent history');
      }
      const data = await response.json();
      const activeOrders: Order[] = data.activeOrders || [];

      setHistory(activeOrders);
    } catch (error) {
      console.error('Error fetching rent history:', error);
    }
  };

  const fetchUserBalance = async () => {
    if (userId) {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setBalance(parseInt(data.balance));
		setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user balance:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserBalance();
    fetchOrders();
  }, []);

  const handleDeposit = () => {
    const userId = localStorage.getItem('userId');
    if (userId && depositAmount) {
      fetch('http://localhost:8080/balance/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, amount: depositAmount }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setBalance((prevBalance) => prevBalance + parseInt(depositAmount, 10));
          setShowDepositForm(false);
          setDepositAmount('');
        })
        .catch((error) => {
          console.error('Error during deposit operation:', error);
        });
    }
  };

  console.log(userInfo);
  

  return (
    <div>
      <h1>Вітаємо, {userInfo ? userInfo.firstName : 'Unknown'}!</h1>
	  <p>Ваша пошта: {userInfo ? userInfo.email : 'Unknown'}</p>
	  <p>Ваш номер телефону: {userInfo ? userInfo.phoneNumber : 'Unknown'}</p>
      <p>Ваш баланс: {balance}$</p>

      <div className="profile-buttons">
        <button onClick={() => setShowDepositForm(true)}>Поповнити баланс</button>
      </div>

      {showDepositForm && (
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
          <button onClick={() => setShowDepositForm(false)}>Назад</button>
        </div>
      )}
		<OrderHistory orders={history} />
    </div>
  );
}

export default ProfilePage;

