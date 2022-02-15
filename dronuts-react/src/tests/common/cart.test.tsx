import React from 'react';
import {render, screen} from '@testing-library/react';
import CartComponent from '../../components/common/cart';

test('renders learn react link', () => {
  render(<CartComponent />);
  const linkElement = screen.getByText(`Checkout`);
  expect(linkElement).toBeInTheDocument();
});
