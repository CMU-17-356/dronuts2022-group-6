import {Card, Text, Divider, Badge, Checkbox, Select} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';

function OrderCardComponent(data: any) {
  const [drones, setDrones] = useState([]);
  const order = data.data;

  useEffect( () => {
    fetch('http://localhost:7200/donuts')
        .then((response) => response.json())
        .then((data: any) => {
          console.log(data);
          setDrones(data);
        });
  }, []);

  async function assignDrone(droneID: any) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({'orderID': order.orderID, 'droneID': droneID}),
    };
    await fetch('http://localhost:7200/matchOrderToDrone', requestOptions)
        .then((response) => response.json())
        .then((data: any) => {
          console.log(data);
        });
  }

  if (order) {
    console.log(order);
    return (
      <Card shadow width="100%" hoverable className='donut-info'>
        <div>
          <h3 className='donut-name'>Order #{order._id}</h3>
          <div>
            <Select placeholder="Drone" initialValue={order.droneID}
              onChange={assignDrone}>
              {drones.map((drone: any, id: number) => {
                <Select.Option value={String(id)}>{drone._id}</Select.Option>;
              })}
            </Select>
          </div>
          <h4 className='donut-name'>Time of Order: {order.timeoforder}</h4>
        </div>
        <Divider />
        <div>
          {/* check this */}
          { order.donuts.map((donut: any, i: number) => {
            return (
              <Text>
                {donut.name} <b>x {donut.quantity}</b>
              </Text>
            );
          })}
        </div>
        <Divider />
        <Badge style={ {backgroundColor: '#ef72ac'} }>
          ${order.orderTotal}</Badge>
        <div className='amount-input'>
          {/* order completed? */}
          <Checkbox checked={false}>Completed</Checkbox>
        </div>
      </Card>
    );
  } else {
    return <h3>Order not available</h3>;
  }
}

export default OrderCardComponent;
