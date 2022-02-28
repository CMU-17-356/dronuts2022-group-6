import { ObjectId } from "mongoose"
import { DonutModel } from "../schema/donutSchema"

interface OrderItem{
    orderID: ObjectId,
    donutID: ObjectId,
    quantity: number,
    subtotal: number
    subtotalWeight: number
}

function newOrderItem(newDonutID: ObjectId, newOrderID: ObjectId, newQuantity: number): OrderItem{
    let newSubtotal: number
    let newSubWeight: number
    
    DonutModel.findOne({ _id: newDonutID}, (err: Error, donut) => {
        if (err){
            console.log(err)
            return
        }

        newSubtotal = donut.price * newQuantity
        newSubWeight = donut.weight * newQuantity
    })

    
    return{
        orderID: newOrderID,
        donutID: newDonutID,
        quantity: newQuantity,
        subtotal: newSubtotal,
        subtotalWeight: newSubWeight
    }
}

export { OrderItem, newOrderItem}