import React, {useEffect, useState} from 'react';
import {Divider, Grid, Page, Spacer, Card, Progress, Image, Text}
  from '@geist-ui/react';
import map from '../../assets/map.png';

function ConfirmationComponent() {
  const [order, setOrder]= useState(() : any => {});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('orderid');
    console.log(id);
    if (id) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'Accept': 'application/json'},
        body: JSON.stringify({'orderID': id}),
      };
      fetch('http://localhost:7200/getOrder', requestOptions)
          .then((response) => response.json())
          .then((data: any) => {
            console.log(data);
            setOrder(data);
          });
    }
  }, []);

  function formatDate(date: string) {
    const d = new Date(date);
    return ' ' + d.getMonth() + '/' + d.getDay() + '/' + d.getFullYear() +
      ' ' + d.getHours()+':'+d.getMinutes();
  }

  if (order) {
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
                <h5>Total: ${order.grandTotal}</h5>
                <div className = "progress">
                  <Progress value={75} />
                  <Text>Time of Purchase:
                    {formatDate(order.timeOfPurchase)}</Text>
                  <Text>Estimated delivery time: 30 minutes</Text>
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
  } else {
    return <h1>No order found.</h1>;
  }
}

export default ConfirmationComponent;
