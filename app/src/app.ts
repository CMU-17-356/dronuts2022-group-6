import express from 'express'
import { ObjectId, Types } from 'mongoose'
import { CustomerModel } from '../schema/customerSchema'
import { PaymentMethod } from '../schema/orderSchema'
import { changeDonutQuantity } from './donut'
import { run } from './mongoosedb'
import { cancelOrder, makePayment, matchOrderToDrone, newOrder } from './order'

run().then(() => {
  const myself = CustomerModel.findOne({ fname: 'Taco' })
  return myself
}).then(smth => {
  console.log(smth._id)
  runExpressServer()
})

function runExpressServer () {
  const app = express()
  const port = 6000

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
  })

  app.post('/changeDonutQuantity/:id', (req, res) => {
    const numChange: number = req.body.numChange
    const donutID: any = req.params.id

    changeDonutQuantity(donutID, numChange, true).then((updatedDonutInfo) => {
      res.status(200).send(updatedDonutInfo)
    })
  })

  app.post('/showOrder', (req, res) => {
    const customerID: ObjectId = req.body.customerID
    const donuts: Array<[Types.ObjectId, number]> = req.body.donuts

    newOrder(customerID, donuts).then((createdOrder) => {
      res.status(200).send(createdOrder.toJSON())
    })
  })
  app.post('/makePayment', (req, res) => {
    const orderID: Types.ObjectId = req.body.orderID
    const paymentMethod: PaymentMethod = req.body.paymentMethod

    makePayment(orderID, paymentMethod).then((paidOrder) => {
      res.status(200).send(paidOrder)
    })
  })

  app.post('/cancelOrder', (req, res) => {
    const orderID: Types.ObjectId = req.body.orderID

    cancelOrder(orderID).then((canclledOrder) => {
      res.status(200).send(canclledOrder)
    })
  })

  app.post('/matchOrderToDrone', (req, res) => {
    const orderID: Types.ObjectId = req.body.orderID
    const droneID: any = req.body.droneID

    matchOrderToDrone(orderID, droneID).then((updatedOrder) => {
      res.status(200).send(updatedOrder)
    })
  })
}
