import React from 'react';
import {render, screen} from '@testing-library/react';
import EmployeeDashboardComponent from
  '../../components/pages/employee-dashboard';

test('it renders explore component', () => {
  render(<EmployeeDashboardComponent />);
  const titleElement = screen.getByText(`Employee Dashboard`);
  expect(titleElement).toBeInTheDocument();
});
