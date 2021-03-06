import React, {useEffect, useState} from 'react';
import {Divider, Grid, Page, Spacer, Card, Progress, Text, Button}
  from '@geist-ui/react';
import {useNavigate} from 'react-router';
import DroneMap from '../common/drone-map';
import './confirmation.css';

function ConfirmationComponent() {
  const navigate = useNavigate();

  const [orderID, setOrderID] = useState('');
  const [order, setOrder]= useState(() : any => {});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('orderid');
    if (id) {
      setOrderID(id);
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'Accept': 'application/json'},
        body: JSON.stringify({'orderID': id}),
      };
      fetch('/getOrder', requestOptions)
          .then((response) => response.json())
          .then((data: any) => {
            setOrder(data);
          });
    }
  }, []);

  function formatDate(date: string) {
    const d = new Date(date);
    return ' ' + d.getMonth() + '/' + d.getDay() + '/' + d.getFullYear() +
      ' ' + d.getHours()+':'+d.getMinutes();
  }

  function cancelOrder() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({'orderID': orderID}),
    };
    fetch('/cancelOrder', requestOptions)
        .then((response) => response.json())
        .then((data: any) => {
          setOrder(data);
          navigate({pathname: '/'});
        });
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
                { order.status != 'incomplete' &&
                  <div className = "progress">
                    <Progress value={75} />
                    <Text>Time of Purchase:
                      {formatDate(order.timeOfPurchase)}</Text>
                    <Text>Estimated delivery time: 30 minutes</Text>
                    <Spacer h={1}/>
                    <Grid.Container gap={2}>
                      <Grid xs={24} md={12}>
                        <DroneMap className='map' location={{
                          lat: order.droneLat,
                          lng: order.droneLong,
                        }} zoomLevel={17} />
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
                    <Spacer h={1}/>
                    <Button onClick={cancelOrder}>Cancel Order</Button>
                  </div>
                }
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
