import React from 'react';
import {render, screen} from '@testing-library/react';
import CartCardComponent from '../../components/common/cart-card';

test('renders learn react link', () => {
  render(<CartCardComponent />);
  const linkElement = screen.getByText(`Glazed w/ Sprinkles`);
  expect(linkElement).toBeInTheDocument();
});

