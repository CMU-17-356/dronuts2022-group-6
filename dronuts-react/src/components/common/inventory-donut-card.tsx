import {Minus, Plus} from '@geist-ui/icons';
import {Card, Text, Divider, Badge, Button} from '@geist-ui/react';
import {useState} from 'react';
import './inventory-donut-card.css';

function InventoryDonutCardComponent(data: any) {
  const [donut] = useState(data);
  const [amount, setAmount] = useState(donut.data.quantity_left);

  function addQuantity() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({'donutID': donut.data._id,
        'numChange': 1, 'add': true}),
    };
    fetch('/changeDonutQuantity', requestOptions)
        .then((response) => response.json())
        .then(() => {
          // eslint-disable-next-line camelcase
          setAmount(amount + 1);
        });
  }

  function subQuantity() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({'donutID': donut.data._id,
        'numChange': 1, 'add': false}),
    };
    fetch('/changeDonutQuantity', requestOptions)
        .then((response) => response.json())
        .then(() => {
          // eslint-disable-next-line camelcase
          setAmount(amount - 1);
        });
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
      <div>
        <span>
          <p><b>Donuts Left: &nbsp; </b>{amount}</p>
          <Button iconRight={<Plus />} auto
            scale={2/3} px={0.6} onClick={addQuantity}></Button>
          <Button iconRight={<Minus />} auto
            scale={2/3} px={0.6} onClick={subQuantity}></Button>
          <p><b>Weight: &nbsp; </b>{donut.data.weight} lbs</p>
        </span>
      </div>
    </Card>
  );
}

export default InventoryDonutCardComponent;
