import React from 'react';
import { useNavigate } from 'react-router-dom';


function Confirmation() {
	const navigate = useNavigate();

	const handleBackToRoute = (route: string) => {
	  navigate(route);
	};

	return (
	<>
		 <div className="thank-you-page">
			<h1>Дякуємо!</h1>
			<p>Ваше замовлення успішно оформлено.</p>
			<div className="buttons-flex">
				<button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>  handleBackToRoute('/main')}>Повернутися на головну</button>
				<button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleBackToRoute('/profile')}>В Особистий кабінет</button>
			</div>
    	</div>
	</>

	);
}


export default Confirmation;