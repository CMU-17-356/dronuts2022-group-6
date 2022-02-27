import {Grid, Page, Spacer} from '@geist-ui/react';
import React, {useState} from 'react';
import DonutCardComponent from '../common/donut-card';
// import NavComponent from '../common/nav';

function ExploreComponent() {
  const [donuts] = useState(() => {
    return [{'id': 1, 'name': 'Glazed W/ Sprinkles', 'price': 4.00,
      'description': 'Nice donut with guey inside'}];
  });

  // fetch('https://localhost:300/donuts')
  //     .then((response) => response.json())
  //     .then((data) => setDonuts(JSON.parse(data)));

  return (
    <div>
      <div className='page'>
        <Page>
          <Page.Content>
            <h2>All Donuts</h2>
            <Spacer h={3}/>
            <Grid.Container gap={5}>
              {donuts.map((item: Object, i: number) => {
                console.log(item);
                return (
                  <Grid sm={10} key={i}>
                    <DonutCardComponent data={item}/>
                  </Grid>);
              })}
            </Grid.Container>
          </Page.Content>
        </Page>
      </div>
    </div>
  );
}

export default ExploreComponent;
