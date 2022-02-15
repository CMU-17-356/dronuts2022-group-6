import mongoose from "mongoose";
import { orderSchema } from "../../schema/orderSchema";
import { customerSchema } from "../../schema/customerSchema";
import { droneSchema } from "../../schema/droneSchema";

const Order = mongoose.model('Order', orderSchema)
const Customer = mongoose.model('Customer', customerSchema)
const Drone = mongoose.model('Drone', droneSchema)

enum DroneStatus {
    ON_WAY_TO_DELIVERY = "on way to deliver",
    ON_WAY_BACK_FROM_DELIVERY = "on way back from delivery",
    IDLE = "idle",
    CHARGING = "charging",
    MAINTENACE= "under maintenance"
}


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

        const correctCustomer = new Customer({
            username: "takholee",
            password: "ilovedonuts",
            fname: "Takho",
            lname: "Lee",
            email: "takhol@andrew.cmu.edu",
            phone: "412-996-5373"
        });

        const correctDrone = new Drone({
            weightLimit: 10,
            batteryStatus: 75,
            droneStatus: DroneStatus.CHARGING
        });

        const correctOrder = new Order({
            customer_id: correctCustomer.id,
            drone_id: correctDrone.id,
            address: "5000 Forbes Ave",
            paymentMethod: PaymentMethod.VISA,
            status: Status.INCOMPLETE
        });

        const correctResult = correctOrder.validateSync()
        expect(correctResult).toBeUndefined()
        expect(correctOrder.address).toBe("5000 Forbes Ave")
    });
});
