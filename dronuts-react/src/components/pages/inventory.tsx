import {Grid, Page, Spacer} from '@geist-ui/react';
import React, {useState} from 'react';
import InventoryDonutCardComponent from '../common/inventory-donut-card';
// import NavComponent from '../common/nav';

function InventoryComponent() {
  const [donuts, setDonuts] = useState(() => {
    return [{'id': 1, 'name': 'Glazed W/ Sprinkles', 'price': 4.00,
      'description': 'Nice donut with guey inside',
      'quantity_left': 4, 'weight': 4},
    {'name': 'Plain', 'description': 'Nice plain donut',
      'price': 2.00, 'id': '#54094', 'quantity_left': 2, 'weight': '4.5'}];
  });

  fetch('https://localhost:3004/donutsEmployee')
      .then((response) => response.json())
      .then((data: any) => {
        setDonuts(data.data);
      });

  return (
    <div>
      <div className='page'>
        <Page>
          <Page.Content>
            <h2>All Donuts</h2>
            <Spacer h={3}/>
            <Grid.Container gap={5}>
              {donuts.map((item: Object, i: number) => {
                return (
                  <Grid sm={10} key={i}>
                    <InventoryDonutCardComponent data={item}/>
                  </Grid>);
              })}
            </Grid.Container>
          </Page.Content>
        </Page>
      </div>
    </div>
  );
}

export default InventoryComponent;
