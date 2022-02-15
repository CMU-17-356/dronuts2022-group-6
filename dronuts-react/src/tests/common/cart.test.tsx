import React from 'react';
import {render, screen} from '@testing-library/react';
import CartComponent from '../../components/common/cart';

test('it renders cart component', () => {
  render(<CartComponent />);
  const linkElement = screen.getByText(`Checkout`);
  expect(linkElement).toBeInTheDocument();
});
