import React from 'react';
import {render, screen} from '@testing-library/react';
import OrderCardComponent from '../../components/common/order-card';


test('it does not render order card component w/o data', () => {
  render(<OrderCardComponent />);
  const orderElement = screen.getByText(`Order not available`);
  expect(orderElement).toBeInTheDocument();
});

const testData =
{customerID: '621d77b7d7ad3f997e60ef00',
  droneID: '621e24fb2305f3ba9d31093d',
  grandTotal: 23.25,
  orderItems: [{
    donutID: {_id: '621e24fb2305f3ba9d310941',
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: 2.5,
      // eslint-disable-next-line camelcase
      quantity_left: 10,
      weight: 1.21},
    orderID: '621e25222305f3ba9d31094f',
    quantity: 4,
    subtotal: 10,
    subtotalWeight: 4.84,
    _id: '621e25222305f3ba9d310952'}],
  paymentMethod: 'visa',
  status: 'indelivery',
  timeOfDeparture: '2022-03-01T13:52:57.722Z',
  _id: '621e25222305f3ba9d31094f'};

test('it renders order card component w/ data', () => {
  render(<OrderCardComponent data={testData}/>);
  const orderElement = screen.getByText(`Order #621e25222305f3ba9d31094f`);
  expect(orderElement).toBeInTheDocument();
});

test('it renders donuts and amount', () => {
  render(<OrderCardComponent data={testData}/>);
  const orderElement = screen.getByText(`Glazed Donut`);
  expect(orderElement).toBeInTheDocument();
});
