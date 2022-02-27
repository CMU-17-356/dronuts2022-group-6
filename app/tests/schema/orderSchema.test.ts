import mongoose from "mongoose";
import { OrderModel, Status, PaymentMethod } from "../../schema/orderSchema";
import { CustomerModel } from "../../schema/customerSchema";
import { DroneModel, DroneStatus } from "../../schema/droneSchema";

describe('Testing Order Schema ', function () {
    test('should allow to make order with valid fields', function () {

        const correctCustomer = new CustomerModel({
            username: "takholee",
            password: "ilovedonuts",
            fname: "Takho",
            lname: "Lee",
            email: "takhol@andrew.cmu.edu",
            phone: "412-996-5373"
        });

        const correctDrone = new DroneModel({
            weightLimit: 10,
            batteryStatus: 75,
            droneStatus: DroneStatus.CHARGING
        });

        const correctOrder = new OrderModel({
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
