import mongoose, { Schema, model, connect } from 'mongoose'
import { CustomerModel } from '../schema/customerSchema'
import { DonutModel } from '../schema/donutSchema'
import { DroneModel } from '../schema/droneSchema'
import { EmployeeModel, EmployeePosition } from '../schema/employeeSchema'
import { OrderItemModel } from '../schema/orderItemsSchema'
import { OrderModel } from '../schema/orderSchema'
import { DroneStatus } from './drone'

async function run (): Promise<void> {
  // Connect to MongoDB
  const uri = 'mongodb+srv://username:password@cluster0.sgdet.mongodb.net/dronuts?retryWrites=true&w=majority'
  const db = await connect(uri)

  await CustomerModel.deleteMany({})
  await DonutModel.deleteMany({})
  await DroneModel.deleteMany({})
  await OrderModel.deleteMany({})
  await OrderItemModel.deleteMany({})
  await EmployeeModel.deleteMany({})

  // Customer
  const customer1 = new CustomerModel({
    username: 'takholee',
    password: 'ilovedonuts',
    fname: 'Taco',
    lname: 'Lee',
    email: 'tacol@andrew.cmu.edu',
    phone: '412-996-5373'
  })
  await customer1.save().then(() =>{
    console.log(customer1.fname)
  })
  

  // Employee
  const employee1 = new EmployeeModel({
    username: 'takhothemanager',
    password: 'ilovedonuts',
    fname: 'Takho',
    lname: 'Lee',
    email: 'takhol@andrew.cmu.edu',
    phone: '412-996-5313',
    position: EmployeePosition.MANAGER
  })
  await employee1.save().then(() =>{
    console.log(employee1.username)
  })

  // drones
  const idleDrone = new DroneModel({
    weightLimit: 10,
    batteryStatus: 75,
    droneStatus: DroneStatus.IDLE
  })

  await idleDrone.save()
  console.log(idleDrone.droneStatus)

  const chargingDrone = new DroneModel({
    weightLimit: 15,
    batteryStatus: 75,
    droneStatus: DroneStatus.CHARGING
  })

  await chargingDrone.save()
  console.log(chargingDrone.droneStatus)

  const deliveringDrone = new DroneModel({
    weightLimit: 15,
    batteryStatus: 75,
    droneStatus: DroneStatus.ON_WAY_BACK_FROM_DELIVERY
  })

  await deliveringDrone.save()
  console.log(deliveringDrone.droneStatus)

  // donuts
  const glazedDonut = new DonutModel({
    name: 'Glazed Donut',
    description: 'A classic, sweet glazed donut',
    price: 2.50,
    quantity_left: 10,
    weight: 1.21
  })
  await glazedDonut.save().then(() =>{
    console.log(glazedDonut._id)
  })
  

  const sprinkledDonut = new DonutModel({
    name: 'Sprinkled Donut',
    description: "Our donut with sprinkles. It's pink!",
    price: 3.50,
    quantity_left: 5,
    weight: 1.32
  })

  await sprinkledDonut.save().then(() =>{
    console.log(sprinkledDonut._id)
  })
  

  const jellyDonut = new DonutModel({
    name: 'Jelly Donut',
    description: 'Donut with strawberry jam in it. So sweet',
    price: 3.50,
    quantity_left: 3,
    weight: 1.74
  })

  await jellyDonut.save()
  console.log(jellyDonut._id)

  const cakeDonut = new DonutModel({
    name: 'Cake Donut',
    description: 'A classic, donut. Have cake for breakfast!',
    price: 1.50,
    quantity_left: 20,
    weight: .75
  })

  await cakeDonut.save().then(() =>{
    console.log(cakeDonut._id)
  })
  

  const powderDonut = new DonutModel({
    name: 'Powdered Donut',
    description: "Powdered and prepared.",
    price: 2.25,
    quantity_left: 13,
    weight: 1.1
  })

  await powderDonut.save().then(() =>{
    console.log(powderDonut._id)
  })
  

  const chocolateSprinkleDonut = new DonutModel({
    name: 'Chocolate Sprinkle Donut',
    description: 'Donut with chocolate and yes, sprinkles!',
    price: 2.75,
    quantity_left: 20,
    weight: 1.4
  })

  await chocolateSprinkleDonut.save()
  console.log(chocolateSprinkleDonut._id)
}

export { run }
