import {Card, Text, Divider, Badge, Checkbox} from '@geist-ui/react';
import React from 'react';

function OrderCardComponent() {
  return (
    <Card shadow width="100%" hoverable className='donut-info'>
      <div>
        <h3 className='donut-name'>Order #453245</h3>
        <h4 className='donut-name'>Drone: D3</h4>
        <h4 className='donut-name'>Time of Order: 7:00AM</h4>
      </div>
      <Divider />
      <Text>
        Glazed w/ Sprinkles <b>x 2</b>
      </Text>
      <Text>
        Glazed <b>x 2</b>
      </Text>
      <Text>
        Cherry filling <b>x 2</b>
      </Text>
      <Text>
        Banana Cream Filling <b>x 2</b>
      </Text>
      <Divider />
      <Badge style={ {backgroundColor: '#ef72ac'} }>$32.00</Badge>
      <div className='amount-input'>
        <Checkbox checked={false}>Completed</Checkbox>
      </div>
    </Card>
  );
}

export default OrderCardComponent;
