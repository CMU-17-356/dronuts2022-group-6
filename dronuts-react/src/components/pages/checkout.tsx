import React, {useState} from 'react';
import NavComponent from '../common/nav';
import {Divider, Page, Spacer, Button} from '@geist-ui/react';
import {CreditCard} from '@geist-ui/icons';
import CartComponent from '../common/cart';
import {useNavigate} from 'react-router-dom';

function CheckoutComponent() {
  const navigate = useNavigate();

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
      'donuts': mappedDonuts, 'paymentMethod': 'visa'};
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify(orderDetails),
    };
    await fetch('/makeOrder', requestOptions)
        .then((response) => response.json())
        .then((data: any) => {
          localStorage.clear();
          navigate({pathname: '/confirmation', search: '?orderid='+data._id});
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
              <Button onClick={handleOrder} iconRight={<CreditCard/>} auto>
                      Proceed with CommerceFriend
              </Button>
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
