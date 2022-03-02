import {Grid, Page, Spacer} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';
import InventoryDonutCardComponent from '../common/inventory-donut-card';
// import NavComponent from '../common/nav';

function InventoryComponent() {
  const [donuts, setDonuts] = useState(() => {
    return [];
  });

  useEffect( () => {
    fetch('http://localhost:7200/donutsEmployee')
        .then((response) => response.json())
        .then((data: any) => {
          console.log(data);
          setDonuts(data);
        });
  }, []);

  return (
    <div>
      <div className='page'>
        <Page>
          <Page.Content>
            <h2>All Donuts</h2>
            <Spacer h={3}/>
            <Grid.Container gap={5}>
              {donuts.map((item: any, i: number) => {
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
