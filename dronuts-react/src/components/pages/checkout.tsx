import React, {useState} from 'react';
import NavComponent from '../common/nav';
import {Divider, Page, Spacer, Button} from '@geist-ui/react';
import {CreditCard} from '@geist-ui/icons';
import CartComponent from '../common/cart';

function CheckoutComponent() {
  const [cart] = useState(() => {
    const cart = localStorage.getItem('cart');
    const initialValue = cart ? JSON.parse(cart) : null;
    return initialValue || [];
  });

  async function handleOrder() {
    const mappedDonuts = cart.map((item: any) => {
      return [item.id, Number(item.amount)];
    });
    const orderDetails = {'customerID': '621d77b7d7ad3f997e60ef00',
      'donuts': mappedDonuts};
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify(orderDetails),
    };
    console.log(requestOptions);
    await fetch('http://localhost:7200/showOrder', requestOptions)
        .then((response) => response.json())
        .then((data: any) => {
          console.log(data);
        });
  }

  return (
    <div>
      <NavComponent/>
      <Spacer h={5}/>
      <div className = "checkoutpage">
        <Page>
          <Page.Content>

            <h1>Your order</h1>

            <Divider h="1px" my={0} />
            <Spacer h={1}/>
            <CartComponent />

            <Spacer h={ 2 }/>
            <div>
              <a href='/confirmation'>
                <Button onClick={handleOrder} iconRight={<CreditCard/>} auto>
                        Proceed with CommerceFriend
                </Button>
              </a>
            </div>
            <div>
            </div>
          </Page.Content>
        </Page>
      </div>

    </div>

  );
}

export default CheckoutComponent;
