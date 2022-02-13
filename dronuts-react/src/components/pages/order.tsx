import React from 'react';
import NavComponent from '../common/nav';
import {Divider, Grid, Page, Spacer, Text,Card, Button} from '@geist-ui/react';
import { Edit,CreditCard } from '@geist-ui/icons'
import CartCardComponent from '../common/cart-card';

function OrderComponent() {
  //return <h1>Order</h1>;
  return (
    <div><NavComponent/>
    <Spacer h={10}/>
    <div className = "orderpage">

        <Page>
            <Page.Content>
            <Card width="500px">
            <Card.Content>
            <h3>Your order</h3>
            </Card.Content>
            <Divider h="1px" my={0} />
                <Spacer h={1}/>
            <Card.Content>

                <div className='order'>
                
                <Grid.Container gap={ 1 } justify="center" direction={ 'column' }>
                    <Grid><CartCardComponent /><Edit/></Grid>
                    <Grid><CartCardComponent /><Edit/></Grid>
                    <Grid><CartCardComponent /><Edit/></Grid>
                </Grid.Container>
                <Spacer h={ 1 }/>
                <Divider />
                <div className='price-total'>
                    <Grid.Container gap={ 1 } direction={ 'column' }>
                    <Grid><h6>Price: </h6> $9.00</Grid>
                    <Grid><h6>Delivery Fee: </h6> $3.00</Grid>
                    <Grid><h6>Tax: </h6> $.50</Grid>
                    <Divider />
                    <Grid><h6>Total Price: </h6> $12.50</Grid>
                    </Grid.Container>
                </div>
                <Spacer h={ 1 }/>
                </div>
            </Card.Content>
            </Card>
            <Spacer h={ 2 }/>
            <div>
            <Button iconRight={<CreditCard/>} auto>Proceed with CommerceFriend</Button>
            </div>
        
            </Page.Content>
        </Page>
    </div>

    </div>

  );
}

export default OrderComponent;
