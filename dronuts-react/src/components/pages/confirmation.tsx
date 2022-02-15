import React from 'react';
import {Divider, Grid, Page, Spacer, Card, Progress, Image}
  from '@geist-ui/react';
import map from '../../assets/map.png';

function ConfirmationComponent() {
  return (
    <div>
      <Spacer h={7}/>
      <div className="confirmationpage">
        <Page>
          <Page.Content>
            <Spacer h={1}/>
            <Card shadow>
              <h3>Order Confirmed!</h3>
              <Divider/>
              <h4>Thank you for your purchase!</h4>
              <div className = "progress">
                <Progress value={75} />
                <text>Estimated delivery time: 4:50 PM</text>
                <Spacer h={1}/>
                <Grid.Container gap={2}>
                  <Grid xs={24} md={12}>
                    <Image src={map} height="400px" width="800px" />
                  </Grid>
                  <Grid xs={12} md={12}>
                    <address>
                            Delivery Address:<br/>
                            5000 Forbes Ave<br/>
                            Carnegie Mellon University,<br/>
                            Pittsburgh, PA 15213<br/>
                    </address>
                  </Grid>
                </Grid.Container>
              </div>
            </Card>
          </Page.Content>
        </Page>
      </div>

    </div>
  );
}

export default ConfirmationComponent;
