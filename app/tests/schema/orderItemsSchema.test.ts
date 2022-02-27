import { OrderItemModel } from "../../schema/orderItemsSchema";
import { DonutModel } from "../../schema/donutSchema";
import { OrderModel, Status, PaymentMethod } from "../../schema/orderSchema";
import { CustomerModel } from "../../schema/customerSchema";
import { DroneModel, DroneStatus } from "../../schema/droneSchema";

describe('Testing OrderItems Schema ', function () {
    test('should allow to make order with valid fields', function () {

        const correctDonut = new DonutModel({
            name: "Glazed Donut",
            description: "A classic, sweet glazed donut",
            price: 2.50,
            quantity_left: 10,
            weight: 1
        });

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

        
        const correctOrderItems = new OrderItemModel({
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