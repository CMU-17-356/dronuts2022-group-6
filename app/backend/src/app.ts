import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

app.post('/changeDonutQuantity/:id', (req, res) => {
  const numChange: Number = req.body.numChange
  const donutID: string = req.params.id

  const updatedDonutInfo: object = updateDonutCount(donutID, numChange)
  
  res.send(updatedDonutInfo)
})

app.post('/showOrder', (req, res) => {
  const customerID: Number = req.body.customerID
  const donuts: object = req.body.donuts

  const createdOrder: object = createOrder(customerID, donuts)
  
  res.send(createdOrder)
})

app.post('/showOrderEmployee', (req, res) => {
  const employeeID: Number = req.body.employeeID
  const orderID: Number = req.body.orderID

  //const createdOrder: object = createOrder(customer, donuts)
  
  //res.send(createdOrder)
})

app.post('/makePayment', (req, res) => {
  const customerID: Number = req.body.customerID
  const orderID: Number = req.body.orderID
  const paymentMethod: Number = req.body.paymentMethod
  
  const paidOrder: object = makePayment(orderID, paymentMethod)
  
  res.send(paidOrder)
})

app.post('/cancelOrder', (req, res) => {
  const orderID: Number = req.body.orderID
  
  const isCancelled: boolean = cancelOrder(orderID)
  
  res.send(paidOrder)
})

