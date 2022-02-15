import mongoose from "mongoose";
import { orderItemsSchema } from "../../schema/orderItemsSchema";
import { donutSchema } from "../../schema/donutSchema";
import { orderSchema } from "../../schema/orderSchema";
import { customerSchema } from "../../schema/customerSchema";
import { droneSchema } from "../../schema/droneSchema";

const Order = mongoose.model('Order', orderSchema)
const Customer = mongoose.model('Customer', customerSchema)
const Drone = mongoose.model('Drone', droneSchema)
const Donut = mongoose.model('Donut', donutSchema)
const OrderItems = mongoose.model('OrderItems', orderItemsSchema)

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

describe('Testing OrderItems Schema ', function () {
    test('should allow to make order with valid fields', function () {

        const correctDonut = new Donut({
            name: "Glazed Donut",
            description: "A classic, sweet glazed donut",
            price: 2.50,
            quantity_left: 10,
            weight: 1
        });

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

        
        const correctOrderItems = new OrderItems({
            donut_id: correctDonut.id,
            order_id: correctOrder.id,
            quantity: 3,
            subtotal: 5.0
        });

        const correctResult = correctOrderItems.validateSync()
        expect(correctResult).toBeUndefined()
        expect(correctOrderItems.subtotal).toBe(5.0)
    });
});