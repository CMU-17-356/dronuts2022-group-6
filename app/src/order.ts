import { Schema, Types, ObjectId } from "mongoose";
import { DonutModel } from "../schema/donutSchema";
import { OrderItemModel } from "../schema/orderItemsSchema";
import { OrderModel, PaymentMethod, Status } from "../schema/orderSchema";

interface Order{
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

async function newOrder (thisCustomerID: ObjectId, thisOrderItems: [Types.ObjectId, number][]): Promise<any>{
    const order = new OrderModel({
        customerID: thisCustomerID,
    })

    await order.save()

    const orderItems = await makeOrderItems((order._id), thisOrderItems).then((orderItems) => {
        order.orderItems = orderItems as unknown as [Schema.Types.ObjectId]
    })

    return new Promise((resolve, reject) => {
        try{
            order.orderItems = orderItems as unknown as [Schema.Types.ObjectId]
            order.save()
            return resolve(order)
        }
        catch{
            console.log("order items not being added")
            return reject("order items adding bad")
        }
    })

}

async function makeOrderItems(thisOrderID: Types.ObjectId, thisOrderItems: [Types.ObjectId, number][]): Promise<[Types.ObjectId]>{
    let orderItemIDs: [Types.ObjectId]

    return new Promise((resolve, reject) => {
        for (const [donutID, quantity] of thisOrderItems){

            DonutModel.findOne({_id: donutID}, async (err, donut) => {
                if (err){
                    return reject(err)
                }
                const orderItem = new OrderItemModel({
                    orderID: thisOrderID,
                    donutID: donutID,
                    quantity: quantity,
                    subtotal: donut.price * quantity,
                    subtotalWeight: donut.weight * quantity
                })
                try{
                    await orderItem.save();
                    orderItemIDs.push(orderItem._id)
                }
                catch{
                    console.log("order items not being made")
                    return reject("order items bad")
                }
                
                
            })

        }

        return resolve(orderItemIDs)
    })
}

export { Order, newOrder }