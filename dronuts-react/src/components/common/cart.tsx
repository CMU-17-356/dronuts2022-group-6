import {Button, Divider, Grid, Spacer} from '@geist-ui/react';
import React from 'react';
import {ArrowRightCircle} from '@geist-ui/icons';
import './cart.css';
import CartCardComponent from './cart-card';

function CartComponent() {
  return (
    <div className='cart'>
      <Grid.Container gap={ 1 } justify="center" direction={ 'column' }>
        <Grid><CartCardComponent /></Grid>
        <Grid><CartCardComponent /></Grid>
        <Grid><CartCardComponent /></Grid>
      </Grid.Container>
      <Spacer h={ 1 }/>
      <Divider />
      <div className='price-total'>
        <Grid.Container gap={ 1 } direction={ 'column' }>
          <Grid><h5>Price: </h5> $9.00</Grid>
          <Grid><h5>Delivery Fee: </h5> $3.00</Grid>
          <Grid><h5>Tax: </h5> $.50</Grid>
          <Divider />
          <Grid><h5>Total Price: </h5> $12.50</Grid>
        </Grid.Container>
      </div>
      <Spacer h={ 2 }/>
      <Button className='checkout-button' auto
        ghost iconRight={ <ArrowRightCircle /> }>Checkout</Button>
    </div>
  );
}

export default CartComponent;
