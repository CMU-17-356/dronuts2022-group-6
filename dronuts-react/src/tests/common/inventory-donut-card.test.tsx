import React from 'react';
import {render, screen} from '@testing-library/react';
import InventoryDonutCardComponent
  from '../../components/common/inventory-donut-card';

const testData = {'name': 'Glazed w/ Sprinkles', 'description':
    'Nice gooey donut', 'price': 3.00, 'id': '#54093',
'quantity_left': 4, 'weight': '5'};

test('it renders inventory card component w/ data', () => {
  render(<InventoryDonutCardComponent data={testData}/>);
  const nameElement = screen.getByText(`Glazed w/ Sprinkles`);
  expect(nameElement).toBeInTheDocument();
});
