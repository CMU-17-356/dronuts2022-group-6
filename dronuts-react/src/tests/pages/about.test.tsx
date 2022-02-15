import React from 'react';
import {render, screen} from '@testing-library/react';
import AboutComponent from '../../components/pages/about';

test('it renders about component', () => {
  render(<AboutComponent />);
  const titleElement = screen.getByText('About');
  expect(titleElement).toBeInTheDocument();
});
