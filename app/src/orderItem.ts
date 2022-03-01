import { ObjectId, Types } from 'mongoose'
import { DonutModel } from '../schema/donutSchema'
import { OrderItemModel } from '../schema/orderItemsSchema'

interface OrderItem {
  orderID: ObjectId
  donutID: ObjectId
  quantity: number
  subtotal: number
  subtotalWeight: number
}

async function makeOrderItems(thisOrderID: Types.ObjectId, thisOrderItems: any): Promise<any> {
  let orderItemIDs = []
  let grandTotal = 0


  for (const [donutID, quantity] of thisOrderItems) {
    await makeOrderItem(thisOrderID, donutID, quantity).then((orderItem) => {
      grandTotal += orderItem.subtotal
      orderItemIDs.push(orderItem._id)
    }).catch((err) => {
      console.log(err)
    })
  }

  
  return new Promise((resolve, reject) => {
    try{
      resolve([orderItemIDs, grandTotal])
    }
    catch(e){
      reject(e)
    }
    
  })
}

async function findDonut(donutID: any){
  return await DonutModel.findById(donutID)
}

async function makeOrderItem(thisOrderID: any, thisDonutID: any, thisQuantity: number): Promise<any> {

  const thisDonut = await findDonut(thisDonutID)

  return new Promise((resolve, reject) => {
    try {
      const orderItem = new OrderItemModel({
        orderID: thisOrderID,
        donutID: thisDonutID,
        quantity: thisQuantity,
        subtotal: thisDonut.price * thisQuantity,
        subtotalWeight: thisDonut.weight * thisQuantity
      })
      orderItem.save()
      resolve(orderItem)
    } catch {
      reject('order items bad')
    }

  })
}

async function findOrderItem(orderItemID: any){
  return await OrderItemModel.findById(orderItemID)
}


export { OrderItem, makeOrderItems, makeOrderItem, findOrderItem}
