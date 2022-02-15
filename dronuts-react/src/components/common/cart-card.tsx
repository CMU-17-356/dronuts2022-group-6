import {Trash} from '@geist-ui/icons';
import {Badge, Button, Card, Divider, Grid, Text} from '@geist-ui/react';
import React from 'react';
import './cart-card.css';

function CartCardComponent() {
  return (
    <Card shadow width="100%" hoverable className='donut-info'>
      <Text h4 className='donut-name'>Glazed w/ Sprinkles
        <Button iconRight={<Trash/>}
          auto scale={2/3} px={0.6} />
      </Text>
      <Divider />
      <Grid.Container gap={ 1 }>
        <Grid><h5>3 x</h5></Grid>
        <Grid>
          <Badge style={ {backgroundColor: '#ef72ac'} }>
                 $1.00
          </Badge></Grid>
      </Grid.Container>
    </Card>
  );
}

export default CartCardComponent;
