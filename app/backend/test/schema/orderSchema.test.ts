import mongoose from "mongoose";
import { orderSchema } from "../../schema/orderSchema";

const Order = mongoose.model('Order', orderSchema)


enum PaymentMethod {
    VISA = "visa",
    VENMO = "venmo",
    PAYPAL = "paypal",
    CREDIT = "credit"
}

enum Status {
    INCOMPLETE = "incomplete",
    INPROGRESS = "inprogress",
    INDELIVERY = "indelivery",
    DELIVERED = "delivered"
}

describe('Testing Order Schema ', function () {
    test('should allow to make order with valid fields', function () {
        const correctOrder = new Order({
            customer_id: 1,
            drone_id: 1,
            orderItems_id: 2,
            address: "5000 Forbes Ave",
            paymentMethod: PaymentMethod.VISA,
            status: Status.INCOMPLETE
        });

        const correctResult = correctOrder.validateSync()
        expect(correctResult).toBeUndefined()
        expect(correctOrder.address).toBe("5000 Forbes Ave")
    });
});
