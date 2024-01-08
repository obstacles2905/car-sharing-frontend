import React from 'react';

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

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
	const cancelOrder = (id : number) => {
		console.log(id);
		const confirm = window.confirm('Ви дійсно хочете видалити замовлення ?');

		if ( confirm ) {
			const fetchBody = {
				"orderId": id,
				"latitude": "48.123456",
				"longitude": "35.45678"
			}

			fetch('http://localhost:8080/orders/finish-rent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fetchBody)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error in deleting rent');
                    }
					
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    alert('Замовлення успішно видалено!');
					document.getElementById(`${"order-" + id}`)?.remove();         
				})
                .catch(error => {
                    console.error('Error:', error);
                });
		}

	};
  	return (
		<>
			<h2 className="title h2">Історія замовлень</h2>
			{orders.length ? (
				<div className="order-history">
				{orders.map((order, index) => (
				<div className='single-order' id={"order-" + order.id} key={index}>
					<div className="order-info">
						<p>Номер замовлення: {order.id}</p>
						<p className="status">Статус: {order.status}</p>
						<p className='cost'>Вартість оренди: {order.cost}$</p>
						<div className='date start-date'>Старт оренди: {new Date(order.startTime).toLocaleString()}</div>
						<div className='date end-date'>Кінець оренди: {new Date(order.endTime).toLocaleString()}</div>
						<p className='location'>Локація: {order.dropOffLocation}</p>
						<div className='refreshed date'>Оновлено: {new Date(order.updatedAt).toLocaleString()}</div>
					</div>
					<div className="order-button cancel-order-btn">
						<button className='red-btn' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => cancelOrder(order.id)}>
							Завершити оренду
						</button>
					</div>
				</div>
				))}
			</div>
			) : ("У вас немає активних замовлень.")}
			
		</>
  	);
};

export default OrderHistory;