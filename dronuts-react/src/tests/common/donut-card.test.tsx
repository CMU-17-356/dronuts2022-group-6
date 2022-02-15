import React from 'react';
import {render, screen} from '@testing-library/react';
import DonutCardComponent from '../../components/common/donut-card';

test('renders learn react link', () => {
  render(<DonutCardComponent />);
  const linkElement = screen.getByText(`Glazed w/ Sprinkles`);
  expect(linkElement).toBeInTheDocument();
});
