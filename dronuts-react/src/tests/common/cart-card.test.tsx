import React from 'react';
import {render, screen} from '@testing-library/react';
import CartCardComponent from '../../components/common/cart-card';

test('it does not render cart card component w/o data', () => {
  render(<CartCardComponent />);
  const linkElement = screen.getByText(`Donut Not Available`);
  expect(linkElement).toBeInTheDocument();
});

const testData = {'id': 1, 'name':
  'Glazed W/ Sprinkles', 'price': 4.00,
'description': 'Nice donut with guey inside'};

test('it renders cart card component w/ data', () => {
  render(<CartCardComponent data={testData}/>);
  const linkElement = screen.getByText(`Glazed W/ Sprinkles`);
  expect(linkElement).toBeInTheDocument();
});
