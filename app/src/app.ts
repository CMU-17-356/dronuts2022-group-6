import express from 'express'
import bodyParser from 'body-parser'
import { ObjectId, Types } from 'mongoose'
import { CustomerModel } from '../schema/customerSchema'
import { PaymentMethod } from '../schema/orderSchema'
import { changeDonutQuantity, getAllDonuts, getAvailableDonuts} from './donut'
import { run } from './mongoosedb'
import { cancelOrder, matchOrderToDrone, newOrder, getOrder,
    getAllOrders, } from './order'
import { getAllDrones, getAvailableDrones } from './drone'
const cors = require('cors');

run().then(() => {
  const myself = CustomerModel.findOne({ fname: 'Taco' }).limit(1)
  return myself
}).then(smth => {
  console.log(smth._id)
  runExpressServer()
})

function runExpressServer () {
  const app = express()
  const port = 7200
  
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/donuts', (req, res) => {
    console.log("Requested Donuts!")
    getAvailableDonuts().then((result) => {
      res.send(result)
    })
  })

  app.get('/donutsEmployee', (req, res) => {
    getAllDonuts().then((result) => {
      res.send(result)
    })
  })

  app.get('/drones', (req, res) => {
    getAllDrones().then((result) => {
      res.send(result)
    })
  })

  app.get('/availableDrones', (req, res) => {
    getAvailableDrones().then((result) => {
      res.send(result)
    })
  })

  app.get('/allOrders', (req, res) => {
    getAllOrders().then((result) => {
      res.send(result)
    })
  })

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
  })

  app.post('/changeDonutQuantity', (req, res) => {
    console.log(req.body.numChange)
    const numChange: number = req.body.numChange
    const add: boolean = req.body.add
    const donutID: any = req.body.donutID

    changeDonutQuantity(donutID, numChange, add).then((updatedDonutInfo) => {
      res.status(200).send(updatedDonutInfo)
    })
  })

  app.post('/makeOrder', (req, res) => {
    const customerID: ObjectId = req.body.customerID
    const donuts = req.body.donuts
    const paymentMethod: PaymentMethod = req.body.paymentMethod
    newOrder(customerID, donuts, paymentMethod).then((createdOrder) => {
      res.status(200).send(createdOrder.toJSON())
    })
  })

  app.post('/getOrder', (req, res) => {
    const orderID: Types.ObjectId = req.body.orderID

    getOrder(orderID).then((order) => {
      res.status(200).send(order)
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
      res.status(200).send(updatedOrder.toJSON())
    })
  })
}
