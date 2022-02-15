import {Grid, Page, Spacer} from '@geist-ui/react';
import React from 'react';
import DonutCardComponent from '../common/donut-card';
import NavComponent from '../common/nav';

function ExploreComponent() {
  return (
    <div>
      <NavComponent />
      <div className='page'>
        <Page>
          <Page.Content>
            <h2>Today's Donut</h2>
            <Spacer h={3}/>
            <Grid.Container gap={10}>
              <Grid sm={10}><DonutCardComponent /></Grid>
            </Grid.Container>
            <Spacer h={5}/>

            <h2>Top Picks</h2>
            <Spacer h={3}/>
            <Grid.Container gap={5}>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
            </Grid.Container>

            <Spacer h={5}/>

            <h2>All Donuts</h2>
            <Spacer h={3}/>
            <Grid.Container gap={5}>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
              <Grid sm={10}><DonutCardComponent /></Grid>
            </Grid.Container>
          </Page.Content>
        </Page>
      </div>
    </div>
  );
}

export default ExploreComponent;
