import {Card, Text, Divider, Badge, Checkbox, Grid} from '@geist-ui/react';
import React from 'react';

function OrderCardComponent(data: any) {
  if (data.data) {
    return (
      <Card shadow width="100%" hoverable className='order-info'>
      
        <Text h4 className='order-name'>{data.data.name}
        </Text>
        <Divider />
        
        <Grid><h5>{data.data.amount} x</h5></Grid>
          <Grid>
            <Badge style={ {backgroundColor: '#ef72ac'} }>
            ${data.data.price}
            </Badge></Grid>
        <Divider />
        {/* <Badge style={ {backgroundColor: '#ef72ac'} }>$32.00</Badge> */}
        <div className='amount-input'>
          <Checkbox checked={false}>Completed</Checkbox>
        </div>
      </Card>
    );

  }
  else {
    return <p>Donut Not Available</p>;
}
}

export default OrderCardComponent;

