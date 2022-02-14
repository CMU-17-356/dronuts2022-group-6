import mongoose from 'mongoose';

const { Schema } = mongoose;


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


const orderSchema = new Schema({
    order_id: Number, //Unique
    customer_id: [
        {type: Schema.Types.ObjectId, ref: 'Customer'} //Foreign key to object
    ], 
    drone_id: [
        {type: Schema.Types.ObjectId, ref: 'Drone'} //Foreign key to object
    ],
    orderItems_id: [
        {type: Schema.Types.ObjectId, ref: 'OrderItems'} //Foreign key to object
    ], 
    address: String,
    paymentMethod: {
        type: String,
        default: PaymentMethod.VISA,
        enum: Object.values(PaymentMethod),
        required: [true, "Payment Method required"]
    },
    status: {
        type: String,
        default: Status.INCOMPLETE,
        enum: Object.values(Status),
        required: [true, "Status required"]
    },
    time_of_purchase: Date,
    time_of_departure: Date,
    time_of_arrival: Date,
    estimated_time: Date,
    grand_total: Number
});

module.exports = mongoose.model('Order', orderSchema);
export {orderSchema}