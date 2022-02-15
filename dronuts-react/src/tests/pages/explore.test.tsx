import React from 'react';
import {render, screen} from '@testing-library/react';
import ExploreComponent from '../../components/pages/explore';

test('it renders explore component', () => {
  render(<ExploreComponent />);
  const titleElement = screen.getByText(`Today's Donut`);
  expect(titleElement).toBeInTheDocument();
});
