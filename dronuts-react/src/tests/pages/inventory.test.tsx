import React from 'react';
import {render, screen} from '@testing-library/react';
import InventoryComponent from '../../components/pages/inventory';

test('it renders about component', () => {
  render(<InventoryComponent />);
  const titleElement = screen.getByText('All Donuts');
  expect(titleElement).toBeInTheDocument();
});
