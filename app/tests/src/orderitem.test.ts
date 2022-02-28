import mongoose, { Types } from 'mongoose'
import { CustomerModel } from '../../schema/customerSchema'
import { DonutModel } from '../../schema/donutSchema'
import { OrderItemModel } from '../../schema/orderItemsSchema'
import { OrderModel } from '../../schema/orderSchema'
import { makeOrderItem, makeOrderItems } from '../../src/orderItem'
// donuts

let glazedDonut
let sprinkledDonut
let jellyDonut
describe('Testing OrderItem.ts ', () => {
    test('can make single item', async () => {
        await mongoose.connect('mongodb://localhost:27017/');
        const correctCustomer = new CustomerModel({
            username: 'takholee',
            password: 'ilovedonuts',
            fname: 'Takho',
            lname: 'Lee',
            email: 'takhol@andrew.cmu.edu',
            phone: '412-996-5373'
        })
        await correctCustomer.save()

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

        const customerID = correctCustomer._id
        const thisOrder = new OrderModel({ customerID: customerID })
        await thisOrder.save()

        return makeOrderItem(thisOrder._id, glazedDonut._id, 4).then((thisOrderItem) => {
            expect(thisOrderItem.orderID).toEqual(thisOrder._id)
            expect(thisOrderItem.donutID).toEqual(glazedDonut._id)
            expect(thisOrderItem.quantity).toEqual(4)
            expect(thisOrderItem.subtotal).toEqual(glazedDonut.price * 4)
            expect(thisOrderItem.subtotalWeight).toEqual(glazedDonut.weight * 4)
        })
    })

    test('can make multiple items', async () => {

        const correctCustomer = new CustomerModel({
            username: 'takholee',
            password: 'ilovedonuts',
            fname: 'Takho',
            lname: 'Lee',
            email: 'takhol@andrew.cmu.edu',
            phone: '412-996-5373'
        })

        const customerID = correctCustomer._id
        const thisOrder = new OrderModel({ customerID: customerID })
        await thisOrder.save()
        
        const items: Array<[Types.ObjectId, number]> = [[glazedDonut._id, 4], [sprinkledDonut._id, 4], [jellyDonut._id, 2]]

        
        return makeOrderItems(thisOrder._id, items).then((orderItemIDsAndGrandTotal) => {
            const orderIDs = orderItemIDsAndGrandTotal[0]
            console.log(`this is orderItemIds ${orderIDs}`)

            orderIDs.forEach((id) =>{
                console.log(id)
                OrderItemModel.findById(id, (err, orderItem) => {
                    if (err){
                        console.log(err)
                    }
                    console.log(orderItem)
                    expect(orderItem.orderID).toEqual(thisOrder._id)

                    if (orderItem.donutID.equals(glazedDonut._id)) {
                        expect(orderItem.quantity).toEqual(4)
                        expect(orderItem.subtotal).toEqual(glazedDonut.price * 4)
                        expect(orderItem.subtotalWeight).toEqual(glazedDonut.weight * 4)
                    }
                    else if (orderItem.donutID.equals(sprinkledDonut._id)) {
                        expect(orderItem.quantity).toEqual(4)
                        expect(orderItem.subtotal).toEqual(sprinkledDonut.price * 4)
                        expect(orderItem.subtotalWeight).toEqual(sprinkledDonut.weight * 4)
                    }
                    else if (orderItem.donutID.equals(jellyDonut._id)) {
                        expect(orderItem.quantity).toEqual(2)
                        expect(orderItem.subtotal).toEqual(jellyDonut.price * 2)
                        expect(orderItem.subtotalWeight).toEqual(jellyDonut.weight * 2)
                    }
                    else {
                        expect(true).toBe(false)
                    }
                }
                )
            })
            mongoose.disconnect()
        })
    })
})
