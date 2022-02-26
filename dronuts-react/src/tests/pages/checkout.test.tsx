import React from 'react';
import {render, screen} from '@testing-library/react';
import CheckoutComponent from '../../components/pages/checkout';

test('renders checkout component', () => {
  render(<CheckoutComponent />);
  const titleElement = screen.getByText(`Your order`);
  expect(titleElement).toBeInTheDocument();
});
