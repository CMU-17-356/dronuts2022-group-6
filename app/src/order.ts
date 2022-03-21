import mongoose, { Schema, Types, ObjectId } from 'mongoose'
import { DonutModel } from '../schema/donutSchema'
import { DroneModel, DroneStatus } from '../schema/droneSchema'
import { OrderItemModel } from '../schema/orderItemsSchema'
import { OrderModel, PaymentMethod, Status } from '../schema/orderSchema'
import { changeDonutQuantity } from './donut'
import { makeOrderItems } from './orderItem'

interface Order {
    customerID: ObjectId
    droneID?: ObjectId
    address?: string
    paymentMethod: PaymentMethod
    status: Status
    orderItems: [ObjectId]
    timeOfPurchase?: Date
    timeOfDeparture?: Date
    timeOfArrival?: Date
    estimatedTime?: Date
    grandTotal?: Number
}

const LAT_LOW = 40.498132
const LAT_HIGH = 40.410934
const LONG_LOW = -80.109799
const LONG_HIGH = -79.803250

async function newOrder(thisCustomerID: ObjectId, thisOrderItems: [any]): Promise<any> {
    const order = new OrderModel({
        customerID: thisCustomerID
    })
    let grandTotal
    let orderItems
    await order.save()
    
    console.log(thisOrderItems)

    //thisOrderItems = thisOrderItems.map((id, q) => [mongoose.Types.ObjectId(id), q])

    await makeOrderItems((order._id), thisOrderItems).then((orderItemsAndTotal) => {
        orderItems = orderItemsAndTotal[0] as unknown as [Schema.Types.ObjectId]
        grandTotal = orderItemsAndTotal[1]
    })

    return new Promise((resolve, reject) => {
        try {
            order.grandTotal = grandTotal
            order.orderItems = orderItems
            order.save()
            resolve(order)
        } catch {
            console.log('order items not being added')
            reject('order items adding bad')
        }
    })
}

async function makePayment(thisOrderID: any, payment: PaymentMethod): Promise<any> {

    const thisOrder = await OrderModel.findById(thisOrderID)
    thisOrder.paymentMethod = payment
    thisOrder.timeOfPurchase = new Date()


    return thisOrder.save().then(order => {
        return order.toJSON()

    }).catch(err => console.log(err))
}

async function getOrder(orderID): Promise<any>{
    const thisOrder = await OrderModel.findById(orderID)
    let droneLat = 0
    let droneLong = 0
    if(thisOrder.status === Status.INDELIVERY){
        //random drone position for now. will integrate drone api later
        droneLat = getRandomInRange(LAT_LOW, LAT_HIGH, 7)
        droneLong = getRandomInRange(LONG_LOW, LONG_HIGH, 7)
    }

    return new Promise((resolve, reject) => {
        const returnJson: any = thisOrder.toJSON()
        returnJson.droneLat = droneLat
        returnJson.droneLong = droneLong
        resolve(returnJson)
    })
}
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

async function cancelOrder(thisOrderID: any): Promise<boolean> {
    const thisOrder = await OrderModel.findById(thisOrderID)

    if (!thisOrder.timeOfDeparture) {
        for (const orderItemID of thisOrder.orderItems) {
            await OrderItemModel.findByIdAndDelete(orderItemID)
        }
        await OrderModel.findByIdAndDelete(thisOrderID)
    }
    const shouldBeNull = await OrderModel.findById(thisOrderID)

    return new Promise((resolve, reject) => {
        resolve(!shouldBeNull)
    })
}

async function matchOrderToDrone(thisOrderID: Types.ObjectId, thisDroneID: ObjectId): Promise<any> {
    const thisOrder = await OrderModel.findById(thisOrderID)
    const thisDrone = await DroneModel.findById(thisDroneID)

    thisDrone.droneStatus = DroneStatus.ON_WAY_TO_DELIVERY
    await thisDrone.save()

    thisOrder.droneID = thisDroneID
    thisOrder.timeOfDeparture = new Date()
    thisOrder.status = Status.INDELIVERY

    return thisOrder.save().then(order => {
        try {
            return (thisOrder.toJSON())
        } catch(e){
            console.log(e)
            return (e)
        }
    })
}

export { Order, newOrder, makePayment, getOrder, cancelOrder, matchOrderToDrone }
