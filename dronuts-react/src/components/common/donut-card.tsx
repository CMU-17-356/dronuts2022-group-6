import React, {useState} from 'react';
import {Card, Text, Divider, Input, Badge, Button} from '@geist-ui/react';
import {Plus} from '@geist-ui/icons';
import './donut-card.css';

function DonutCardComponent(data: any) {
  const [amount, setAmount] = useState('');

  let donut = data;

  const tempDonut = {data:
    {'name': 'Glazed w/ Sprinkles', 'description':
      'Nice gooey donut', 'price': 3.00, 'id': -1},
  };

  if (donut.data == null) {
    donut = tempDonut;
  }

  function handleSubmit() {
    const cart = localStorage.getItem('cart');
    const item = {'amount': amount,
      'name': donut.data.name, 'price': donut.data.price, 'id': donut.data.id};
    if (cart != null) {
      const parsedCart: Object[] = JSON.parse(cart);
      parsedCart.push(item);
      localStorage.setItem('cart', JSON.stringify(parsedCart));
    } else {
      const newCart = [];
      newCart[0] = item;
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  return (
    <Card shadow width="100%" hoverable className='donut-info'>
      <div>
        <h4 className='donut-name'>{donut.data.name}</h4>
      </div>
      <Divider />
      <Text>{donut.data.description}
      </Text>
      <Divider />
      <Badge style={ {backgroundColor: '#ef72ac'} }>${donut.data.price}</Badge>
      <div className='amount-input'>
        <Input placeholder="Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}/>
        <Button iconRight={<Plus />} auto
          scale={2/3} px={0.6} onClick={handleSubmit}></Button>
      </div>
    </Card>
  );
}

export default DonutCardComponent;
