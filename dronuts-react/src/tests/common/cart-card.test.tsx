import React from 'react';
import {render, screen} from '@testing-library/react';
import CartCardComponent from '../../components/common/cart-card';

test('it renders cart card component', () => {
  render(<CartCardComponent />);
  const linkElement = screen.getByText(`Glazed w/ Sprinkles`);
  expect(linkElement).toBeInTheDocument();
});

