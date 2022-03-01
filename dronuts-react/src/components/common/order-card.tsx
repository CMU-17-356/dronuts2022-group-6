import {Card, Text, Divider, Badge, Checkbox,
  Select, Spacer} from '@geist-ui/react';
import React, {useEffect, useState} from 'react';

function OrderCardComponent(data: any) {
  const [drones, setDrones] = useState([]);
  const order = data.data;
  const [status, setStatus] = useState(order ? order.status : '');
  const orderItems = order ? order.orderItems : [];

  useEffect( () => {
    fetch('http://localhost:7200/availableDrones')
        .then((response) => response.json())
        .then((data: any) => {
          // setDrones(data);
        });
  }, []);

  function getTotalWeight() {
    let totalWeight = 0;
    for (let i = 0; i < orderItems.length; i++) {
      totalWeight += orderItems[i].subtotalWeight;
    }
    return totalWeight;
  }


  async function assignDrone(droneID: any) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({'orderID': order._id, 'droneID': droneID}),
    };
    await fetch('http://localhost:7200/matchOrderToDrone', requestOptions)
        .then((response) => response.json())
        .then((data: any) => {
          setStatus(data.status);
        });
  }

  if (order) {
    return (
      <Card shadow width="100%" hoverable className='donut-info'>
        <div>
          <h3>Order #{order._id}</h3>
          <Select placeholder="Assign Drone"
            onChange={assignDrone} initialValue={order.droneID} width="100%">
            {drones.map((drone: any, id: number) => {
              return (<Select.Option key={id}
                value={drone._id}><b>{drone._id}</b>(
                {drone.droneStatus}, {drone.batteryStatus}%,
                {drone.weightLimit}lbs)</Select.Option>);
            })}
          </Select>
          <Spacer h={2}/>
          <h4>Payment: {order.paymentMethod}</h4>
          <h4>Total Weight: {getTotalWeight()} lbs</h4>
        </div>
        <Divider />
        <div>
          {/* check this */}
          { orderItems.map((donut: any, i: number) => {
            return (
              <Text key={i}>
                {donut.donutID.name} <b>x {donut.quantity}</b>
              </Text>
            );
          })}
        </div>
        <Divider />
        <Badge style={ {backgroundColor: '#ef72ac'} }>
          ${order.grandTotal}</Badge>
        <div className='amount-input'>
          <Checkbox disabled checked={status != 'incomplete'}>
            Completed</Checkbox>
        </div>
      </Card>
    );
  } else {
    return <h3>Order not available</h3>;
  }
}

export default OrderCardComponent;
