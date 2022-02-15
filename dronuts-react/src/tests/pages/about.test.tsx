import React from 'react';
import {render, screen} from '@testing-library/react';
import AboutComponent from '../../components/pages/about';

test('renders about page', () => {
  render(<AboutComponent />);
  const titleElement = screen.getByText('About');
  expect(titleElement).toBeInTheDocument();
});
