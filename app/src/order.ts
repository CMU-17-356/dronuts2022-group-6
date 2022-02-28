import { Schema, Types, ObjectId } from "mongoose";
import { DonutModel } from "../schema/donutSchema";
import { OrderItemModel } from "../schema/orderItemsSchema";
import { OrderModel, PaymentMethod, Status } from "../schema/orderSchema";
import { changeDonutQuantity } from "./donut";

interface Order {
    customerID: ObjectId,
    droneID?: ObjectId,
    address?: string,
    paymentMethod: PaymentMethod
    status: Status
    orderItems: [ObjectId]
    timeOfPurchase?: Date,
    timeOfDeparture?: Date,
    timeOfArrival?: Date,
    estimatedTime?: Date,
    grandTotal?: Number
}

async function newOrder(thisCustomerID: ObjectId, thisOrderItems: [Types.ObjectId, number][]): Promise<any> {
    const order = new OrderModel({
        customerID: thisCustomerID,
    })

    await order.save()

    const orderItems = await makeOrderItems((order._id), thisOrderItems).then((orderItems) => {
        order.orderItems = orderItems as unknown as [Schema.Types.ObjectId]
    })

    return new Promise((resolve, reject) => {
        try {
            order.orderItems = orderItems as unknown as [Schema.Types.ObjectId]
            order.save()
            resolve(order.toJSON())
        }
        catch {
            console.log("order items not being added")
            reject("order items adding bad")
        }
    })

}

async function makeOrderItems(thisOrderID: Types.ObjectId, thisOrderItems: [Types.ObjectId, number][]): Promise<[Types.ObjectId]> {
    let orderItemIDs: [Types.ObjectId]

    return new Promise((resolve, reject) => {
        for (const [donutID, quantity] of thisOrderItems) {
            changeDonutQuantity(donutID, quantity, false).then((donut) => {
                const orderItem = new OrderItemModel({
                    orderID: thisOrderID,
                    donutID: donutID,
                    quantity: quantity,
                    subtotal: donut.price * quantity,
                    subtotalWeight: donut.weight * quantity
                })
                try {
                    orderItem.save();
                    orderItemIDs.push(orderItem._id)
                }
                catch {
                    console.log("order items not being made")
                    reject("order items bad")
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        resolve(orderItemIDs)
    })
}

async function makePayment(thisOrderID: Types.ObjectId, payment: PaymentMethod): Promise<any> {
    const thisOrder = await OrderModel.findById(thisOrderID)

    return new Promise((resolve, reject) => {
        try {
            thisOrder.paymentMethod = payment
            thisOrder.timeOfPurchase = new Date()
            thisOrder.save()
            resolve(thisOrder.toJSON())
        }
        catch {
            console.log("order payment not being made")
            reject("order payment bad")
        }
    })
}

async function cancelOrder(thisOrderID: any): Promise<boolean> {
    const thisOrder = await OrderModel.findById(thisOrderID)

    return new Promise((resolve, reject) => {
        try {
            if (thisOrder.timeOfDeparture) {
                for (const orderItemID of thisOrder.orderItems) {
                    OrderItemModel.findById(orderItemID, (err, orderItem) =>{
                        changeDonutQuantity(orderItem.donutID, orderItem.quantity, true).then((donut) => {
                            
                            try {
                                OrderItemModel.findByIdAndDelete(orderItemID)
                            }
                            catch {
                                console.log("order items not being made")
                                reject("order items bad")
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    })
                }
                OrderItemModel.findByIdAndDelete(thisOrderID)
                

                resolve(true)
            }
            else {
                resolve(false)
            }
        }
        catch {
            console.log("cancellation erroneous")
            reject("cancellation bad")
        }
    })
}

async function matchOrderToDrone(thisOrderID: Types.ObjectId, thisDroneID: ObjectId): Promise<any> {
    const thisOrder = await OrderModel.findById(thisOrderID)

    return new Promise((resolve, reject) => {
        try {
            thisOrder.droneID = thisDroneID
            thisOrder.save()
            resolve(thisOrder.toJSON())
        }
        catch {
            console.log("cancellation erroneous")
            reject("cancellation bad")
        }
    })
}

export { Order, newOrder, makePayment, cancelOrder, matchOrderToDrone }