import mongoose, { Schema, Types, ObjectId } from 'mongoose'
import { DonutModel } from '../schema/donutSchema'
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

async function newOrder(thisCustomerID: ObjectId, thisOrderItems: [any]): Promise<any> {
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

    return new Promise((resolve, reject) => {
        try {
            order.grandTotal = grandTotal
            order.orderItems = orderItems
            order.save()
            resolve(order)
        } catch {
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

export { Order, newOrder, makePayment, cancelOrder, matchOrderToDrone, getAllOrders}
