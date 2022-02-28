import {Card, Text, Divider, Badge} from '@geist-ui/react';
import './inventory-donut-card.css';

function InventoryDonutCardComponent(data: any) {
  let donut = data;

  const tempDonut = {data:
    {'name': 'Glazed', 'description':
    'Nice gooey donut', 'price': 3.00, 'id': '#54093',
    'quantity_left': 4, 'weight': '5'},
  };

  if (donut.data == null) {
    donut = tempDonut;
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
          <p><b>Donuts Left: &nbsp; </b>{donut.data.quantity_left}</p>
          <p><b>Weight: &nbsp; </b>{donut.data.weight} lbs</p>
        </span>
      </div>
    </Card>
  );
}

export default InventoryDonutCardComponent;
