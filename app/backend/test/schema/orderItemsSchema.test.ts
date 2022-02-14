import mongoose from "mongoose";
import { orderItemsSchema } from "../../schema/orderItemsSchema";

const OrderItems = mongoose.model('OrderItems', orderItemsSchema)

describe('Testing OrderItems Schema ', function () {
    test('should allow to make order with valid fields', function () {
        const correctOrderItems = new OrderItems({
            donut_id: 1,
            order_id: 2,
            quantity: 3,
            subtotal: 5.0
        });

        const correctResult = correctOrderItems.validateSync()
        expect(correctResult).toBeUndefined()
        expect(correctOrderItems.subtotal).toBe(5.0)
    });
});