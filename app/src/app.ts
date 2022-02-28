import express from 'express';
import { ObjectId, Types } from 'mongoose';
import { CustomerModel } from "../schema/customerSchema";
import { run } from "./mongoosedb";
import { newOrder } from './order';

run().then(() => {
    const myself = CustomerModel.findOne({ 'fname': "Takho" })
    return myself
}).then(smth => {
    console.log(smth._id)
    runExpressServer()
})

function runExpressServer() {
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
      const customerID: ObjectId = req.body.customerID
      const donuts: [Types.ObjectId, number][] = req.body.donuts

      newOrder(customerID, donuts).then((createdOrder) => {
        res.status(200).send(createdOrder.toJSON())
      })

      
    })

    app.post('/showOrderEmployee', (req, res) => {
      const employeeID: string = req.body.employeeID
      const orderID: string = req.body.orderID

      //const createdOrder: object = createOrder(customer, donuts)

      //res.send(createdOrder)
    })

    app.post('/makePayment', (req, res) => {
      const customerID: string = req.body.customerID
      const orderID: string = req.body.orderID
      const paymentMethod: Number = req.body.paymentMethod

      const paidOrder: object = makePayment(orderID, paymentMethod)

      res.send(paidOrder)
    })

    app.post('/cancelOrder', (req, res) => {
      const orderID: Number = req.body.orderID

      const isCancelled: boolean = cancelOrder(orderID)

      res.send(paidOrder)
    })
}



