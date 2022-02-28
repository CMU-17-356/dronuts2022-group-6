import React from 'react';
import {render, screen} from '@testing-library/react';
import InventoryComponent from '../../components/pages/inventory';
import setupFetchStub from '../fetchMock';

test('it renders about component', () => {
  render(<InventoryComponent />);
  const titleElement = screen.getByText('All Donuts');
  expect(titleElement).toBeInTheDocument();
});

test('it renders donuts from API endpoint', async () => {
  const data = [{'id': '#453245',
    'name': 'New Donut', 'price': 4.00,
    'description': 'Nice donut with guey inside'}];
  // eslint-disable-next-line no-undef
  jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(data));

  render(<InventoryComponent />);
  expect(await screen.findByText('New Donut')).toBeInTheDocument();
});
