import { create } from 'domain'
import mongoose, { Types } from 'mongoose'
import { CustomerModel } from '../../schema/customerSchema'
import { DonutModel } from '../../schema/donutSchema'
import { DroneModel, DroneStatus } from '../../schema/droneSchema'
import { OrderItemModel } from '../../schema/orderItemsSchema'
import { OrderModel, PaymentMethod } from '../../schema/orderSchema'
import { cancelOrder, makePayment, matchOrderToDrone, newOrder } from '../../src/order'
import { makeOrderItem, makeOrderItems } from '../../src/orderItem'

let glazedDonut
let sprinkledDonut
let jellyDonut
let items
let correctCustomer
let drone

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/');
    glazedDonut = new DonutModel({
        name: 'Glazed Donut',
        description: 'A classic, sweet glazed donut',
        price: 2.50,
        quantity_left: 10,
        weight: 1
    })
    await glazedDonut.save()

    sprinkledDonut = new DonutModel({
        name: 'Sprinkled Donut',
        description: "Our donut with sprinkles. It's pink!",
        price: 3.50,
        quantity_left: 5,
        weight: 1
    })
    await sprinkledDonut.save()

    jellyDonut = new DonutModel({
        name: 'Jelly Donut',
        description: 'Donut with strawberry jam in it. So sweet',
        price: 3.50,
        quantity_left: 3,
        weight: 1
    })
    await jellyDonut.save()
    items = [[glazedDonut._id, 4], [sprinkledDonut._id, 4], [jellyDonut._id, 2]]

    correctCustomer = new CustomerModel({
        username: 'takholee',
        password: 'ilovedonuts',
        fname: 'Takho',
        lname: 'Lee',
        email: 'takhol@andrew.cmu.edu',
        phone: '412-996-5373'
    })
    await correctCustomer.save()

    drone = new DroneModel({
        weightLimit: 10,
        batteryStatus: 75,
        droneStatus: DroneStatus.IDLE
    })

    await drone.save()
})


describe('Testing order.ts ', () => {
    let createdOrder
    test('can make new order', async () => {
        const customerID = correctCustomer._id

        return newOrder(customerID, items).then((thisOrder) => {
            createdOrder = thisOrder
            expect((thisOrder.orderItems).length).toEqual(3)
            expect(thisOrder.grandTotal).toEqual(31)
        })
    })

    test('can make payment', async () => {

        return makePayment(createdOrder._id, PaymentMethod.CREDIT).then((orderJson) => {
            expect((orderJson.paymentMethod)).toEqual(PaymentMethod.CREDIT)
            expect(orderJson.timeOfPurchase).toBeDefined()

        })
    })

    test('can match drone to order', async () => {

        return matchOrderToDrone(createdOrder._id, drone._id).then((result) => {
            console.log(result)
            expect(result.timeOfDeparture).toBeDefined()
        })
    })

    test('cannot cancel order', async () => {

        return cancelOrder(createdOrder._id).then((result) => {
            expect(result).toBeFalsy()

        })
    })

    test('can cancel order', async () => {
        createdOrder.timeOfDeparture = null
        await createdOrder.save()

        return cancelOrder(createdOrder._id).then((result) => {
            expect(result).toBeTruthy()

        })
    })

    
})