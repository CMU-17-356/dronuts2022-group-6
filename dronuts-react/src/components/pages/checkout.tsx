import React from 'react';
import NavComponent from '../common/nav';
import {Divider, Page, Spacer, Button} from '@geist-ui/react';
import {CreditCard} from '@geist-ui/icons';
import CartComponent from '../common/cart';

function CheckoutComponent() {
  async function handleOrder() {
    const postDetails = {};
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postDetails),
    };
    await fetch('https://reqres.in/api/posts', requestOptions);
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
