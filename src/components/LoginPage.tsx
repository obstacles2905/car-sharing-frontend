import React, { useState } from 'react';
import '../styles/AuthFormStyles.css';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }: { onLogin: any }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const requestBody = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem('userId', data.userId);
            onLogin();
            navigate('/main');
        } catch (error: any) {
            console.error('Error during data fetching', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Увійти в аккаунт</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className='form-field'>
                    <label>Пошта:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-field'>
                    <label>Пароль:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Увійти</button>
            </form>
        </div>
    );
}

export default LoginPage;
