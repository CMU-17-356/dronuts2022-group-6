import {Button, Divider, Grid, Spacer} from '@geist-ui/react';
import React, {useState} from 'react';
import './cart.css';
import CartCardComponent from './cart-card';

function CartComponent() {
  const tax = .06;
  const [cart, setCart] = useState(() => {
    const cart = localStorage.getItem('cart');
    const initialValue = cart ? JSON.parse(cart) : null;
    return initialValue || [];
  });

  function clearCart() {
    setCart([]);
    localStorage.removeItem('cart');
  }

  function getPrice() {
    let p = 0;
    if (cart) {
      cart.forEach((cartItem: any)=> {
        p += Number(cartItem.amount) * Number(cartItem.price);
      });
    }
    return p;
  }

  function getTotalPrice() {
    const price = getPrice();
    const taxedPrice = price * tax;
    return price + taxedPrice + 3;
  }

  return (
    <div className='cart'>
      <Grid.Container gap={ 1 } justify="center" direction={ 'column' }>
        {cart.map((item: Object, i: number) => {
          return (<Grid key={i}><CartCardComponent data={item}/></Grid>);
        })}
      </Grid.Container>
      <Spacer h={ 1 }/>
      <Button auto ghost onClick={clearCart}>Clear Cart
      </Button>
      <Divider />
      <div className='price-total'>
        <Grid.Container gap={ 1 } direction={ 'column' }>
          <Grid><h5>Price: </h5> ${getPrice()}</Grid>
          <Grid><h5>Delivery Fee: </h5> $3.00</Grid>
          <Grid><h5>Tax: </h5> {getPrice()*tax}</Grid>
          <Divider />
          <Grid><h5>Total Price: </h5> ${getTotalPrice()}</Grid>
        </Grid.Container>
      </div>
      <Spacer h={ 2 }/>
    </div>
  );
}

export default CartComponent;
