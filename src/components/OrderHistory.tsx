import React from 'react';

interface Order {
  status: string;
  carId: number;
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
  return (
    <>
      <div className="order-history">
        {orders.map((order, index) => (
          <div key={index}>
            <p>ID Машини: {order.carId}</p>
            <p className="status">Статус: {order.status}</p>
            Вартість оренди: {order.cost}$
            <div>Дата створення: {new Date(order.createdAt).toLocaleString()}</div>
            <div>Старт оренди: {new Date(order.startTime).toLocaleString()}</div>
            <div>Кінець оренди: {new Date(order.endTime).toLocaleString()}</div>
            <p>Локація: {order.dropOffLocation}</p>
            <div>Оновлено: {new Date(order.updatedAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistory;