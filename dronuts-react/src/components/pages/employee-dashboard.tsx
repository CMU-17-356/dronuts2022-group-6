import {Divider, Grid, Page, Spacer, Text} from '@geist-ui/react';
import React from 'react';
import OrderCardComponent from '../common/order-card';
// import NavComponent from '../common/nav';

function EmployeeDashboardComponent() {
  return (
    <div>
      <div className='page'>
        <Page>
          <Page.Content>
            <h1>Employee Dashboard</h1>
            <h3>Current Position: CREW</h3>
            <Text blockquote>
              Clocked in at: 8:03 AM
            </Text>
            <Spacer h={3}/>
            <Divider />
            <Spacer h={3}/>

            <h2>Orders:</h2>
            <Grid.Container gap={5}>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
              <Grid sm={24}><OrderCardComponent /></Grid>
            </Grid.Container>
          </Page.Content>
        </Page>

      </div>
    </div>

  );
}

export default EmployeeDashboardComponent;
