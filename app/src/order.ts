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
    orderItems: [{type: ObjectId, ref: 'OrderItems'}]
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

async function newOrder(thisCustomerID: ObjectId, thisOrderItems: [any], payment: PaymentMethod): Promise<any> {

    const order = new OrderModel({
        customerID: thisCustomerID
    })
    let grandTotal
    let orderItems
    await order.save()
    
    //thisOrderItems = thisOrderItems.map((id, q) => [mongoose.Types.ObjectId(id), q])

    await makeOrderItems((order._id), thisOrderItems).then((orderItemsAndTotal) => {
        orderItems = orderItemsAndTotal[0] as unknown as [Schema.Types.ObjectId]
        grandTotal = orderItemsAndTotal[1]
    })

    let thisDonut = DonutModel.findById(orderItems.donutID);
    if (thisDonut.quantity_left - orderItems.quantity < 0) {
        throw new Error("Not Enough Quantity Left")
    }
    else [
        thisDonut.quantity_left -= orderItems.quantity
    ]
    thisDonut.save()

    return new Promise((resolve, reject) => {
        try {
            order.grandTotal = grandTotal
            order.orderItems = orderItems
            order.paymentMethod = payment
            order.timeOfPurchase = new Date()
            order.save()
            resolve(order)
        } catch {
            reject('order items adding bad')
        }
    })
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
            return (thisOrder)
        } catch(e){
            console.log(e)
            return (e)
        }
    })
}


async function getAllOrders(): Promise<any> {
    return OrderModel.find({}).populate({
            path: 'orderItems',
            populate: { path: 'donutID' }
        }).then((result) => {
        return result
    })
}

export { Order, newOrder, cancelOrder, matchOrderToDrone, getAllOrders, getOrder}