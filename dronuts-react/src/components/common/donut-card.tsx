import {Card, Text, Divider, Input, Badge} from '@geist-ui/react';
import {Plus} from '@geist-ui/icons';
import './donut-card.css';
import React from 'react';
import tempDonut from '../../assets/donut-temp.png';

function DonutCardComponent() {
  return (
    <Card shadow width="100%" hoverable className='donut-info'>
      <div>
        <h4 className='donut-name'>Glazed w/ Sprinkles</h4>
        <img className='donut-img'
          src={ tempDonut } alt="donut" />
      </div>
      <Divider />
      <Text>A warm, gluey donut with a soft glazing.
      </Text>
      <Divider />
      <Badge style={ {backgroundColor: '#ef72ac'} }>$1.00</Badge>
      <div className='amount-input'>
        <Input placeholder="Amount" iconRight={ <Plus /> }/>
      </div>
    </Card>
  );
}

export default DonutCardComponent;
