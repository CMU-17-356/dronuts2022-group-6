import mongoose from 'mongoose';

const { Schema } = mongoose;


const orderItemsSchema = new Schema({
    orderItem_id: Number, //Unique
    order_id: [
        {type: Schema.Types.ObjectId, ref: 'Order'} //Foreign key to object
    ], 
    donut_id: [
        {type: Schema.Types.ObjectId, ref: 'Donut'} //Foreign key to object
    ],
    quantity: {
        type: Number,
        default: 0,
        validate:{
            validator: (v) => {
                return v >= 0
            },
            message: `quantity cannot less than 0!`
        },
        required: [true, "quantity required"]
    }, 
    subtotal: {
        type: Number,
        default: 0.0,
        validate:{
            validator: (v) => {
                return v >= 0
            },
            message: `subtotal cannot less than 0!`
        },
        required: [true, "subtotal required"]
    },
});

module.exports = mongoose.model('OrderItems', orderItemsSchema);
export {orderItemsSchema}