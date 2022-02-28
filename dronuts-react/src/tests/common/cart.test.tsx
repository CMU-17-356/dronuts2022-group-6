import React from 'react';
import {render, screen} from '@testing-library/react';
import CartComponent from '../../components/common/cart';


test('it renders cart component', () => {
  render(<CartComponent />);
  const checkoutElement = screen.getByText(`Total Price:`);
  expect(checkoutElement).toBeInTheDocument();
});


test('it renders localStorage cart elements', () => {
  const testDonut = [{'name': 'Glazed w/ Sprinkles', 'description':
      'Nice gooey donut', 'price': 3.00, 'id': -1}];

  window.localStorage.setItem('cart', JSON.stringify(testDonut));

  render(<CartComponent />);
  const checkoutElement = screen.getByText(`Glazed w/ Sprinkles`);
  expect(checkoutElement).toBeInTheDocument();
});
