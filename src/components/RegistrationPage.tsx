import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/AuthFormStyles.css';
import {useNavigate} from "react-router-dom";


interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
}
const fieldNames: { [key: string]: string } = {
	firstName: "Ім'я",
	lastName: "Прізвище",
	email: "Пошта",
	phoneNumber: "Номер телефону",
	password: "Пароль",
	confirmPassword: "Підтвердження паролю"
};
  
function RegisterPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
	  firstName: '',
	  lastName: '',
	  email: '',
	  phoneNumber: "",
	  password: '',
	  confirmPassword: '',
	});
	const [errorMessage, setErrorMessage] = useState<string>('');
  
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
	  const { name, value } = event.target;
	  setFormData({ ...formData, [name]: value });
	};
  
	const handleSubmit = async (event: FormEvent) => {
	  event.preventDefault();
	  const { firstName, lastName, email, password, phoneNumber, confirmPassword } = formData;
  
	  // Проверка на соответствие паролей
	  if (password !== confirmPassword) {
		setErrorMessage('Паролі не співпадають');
		return;
	  }
  
	  const requestBody = { email, firstName, lastName, phoneNumber, password };
  
	  try {
		const response = await fetch('http://localhost:8080/users/register', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(requestBody)
		});
  
		const data = await response.json();
		if (!response.ok) {
		  throw new Error(data.message || 'Registration failed');
		}
  
		localStorage.setItem('userId', data.userId);
		navigate('/profile');
	  } catch (error: any) {
		console.error('Error during data fetching', error);
		setErrorMessage(error.message || 'Registration failed');
	  }
	};
  
	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit}>
				<h2>Реєстрація</h2>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{(['firstName', 'lastName', 'email', 'phoneNumber', 'password', 'confirmPassword'] as const).map((field) => (
					<div className='form-field' key={field}>
					<label>{fieldNames[field]}:</label>
					<input
						type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
						name={field}
						value={formData[field]}
						onChange={handleInputChange}
					/>
					</div>
				))}
				<button type="submit">Зареєструватись</button>
			</form>
		</div>
	);
}

export default RegisterPage;
