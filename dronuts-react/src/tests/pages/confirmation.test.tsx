import React from 'react';
import {render, screen} from '@testing-library/react';
import ConfirmationComponent from '../../components/pages/confirmation';

test('renders confirmation component', () => {
  render(<ConfirmationComponent />);
  const titleElement = screen.getByText(`Order Confirmed!`);
  expect(titleElement).toBeInTheDocument();

});
