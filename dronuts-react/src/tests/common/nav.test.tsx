import React from 'react';
import {render, screen} from '@testing-library/react';
import NavComponent from '../../components/common/nav';

test('renders learn react link', () => {
  render(<NavComponent />);
  const linkElement = screen.getByText(`Explore`);
  expect(linkElement).toBeInTheDocument();
});
