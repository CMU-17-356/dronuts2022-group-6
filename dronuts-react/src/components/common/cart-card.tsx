
import {Badge, Card, Divider, Grid, Text} from '@geist-ui/react';
import React from 'react';
import './cart-card.css';

function CartCardComponent(data: any) {
  if (data.data) {
    return (
      <Card shadow width="100%" hoverable className='donut-info'>
        <Text h4 className='donut-name'>{data.data.name}
        </Text>
        <Divider />
        <Grid.Container gap={ 1 }>
          <Grid><h5>{data.data.amount} x</h5></Grid>
          <Grid>
            <Badge style={ {backgroundColor: '#ef72ac'} }>
            ${data.data.price}
            </Badge></Grid>
        </Grid.Container>
      </Card>
    );
  } else {
    return <p>Donut Not Available</p>;
  }
}

export default CartCardComponent;
