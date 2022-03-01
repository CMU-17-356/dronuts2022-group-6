import React from 'react';
import {render, screen} from '@testing-library/react';
import ExploreComponent from '../../components/pages/explore';

function setupFetchStub(data: any) : any {
  return function fetchStub() {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            'data': data,
          }),
      });
    });
  };
}

test('it renders explore component', () => {
  render(<ExploreComponent />);
  const titleElement = screen.getByText(`All Donuts`);
  expect(titleElement).toBeInTheDocument();
});

test('it renders donuts from API endpoint', async () => {
  const data = [{'id': 1,
    'name': 'New Donut', 'price': 4.00,
    'description': 'Nice donut with guey inside'}];
  // eslint-disable-next-line no-undef
  jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(data));

  render(<ExploreComponent />);
  expect(await screen.findByText('New Donut')).toBeInTheDocument();
});

