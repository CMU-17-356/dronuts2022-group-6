import mongoose from 'mongoose';
import { ObjectId } from "mongoose"

import { OrderItem } from '../src/orderItem';

const { Schema } = mongoose;


const orderItemsSchema = new Schema<OrderItem>({
    orderID: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    } //Foreign key to object
    , 
    donutID: {
        type: Schema.Types.ObjectId,
        ref: 'Donut'
    } //Foreign key to object
    ,
    quantity: {
        type: Number,
        default: 0,
        validate:{
            validator: (v: number) => {
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
            validator: (v: number) => {
                return v >= 0
            },
            message: `subtotal cannot less than 0!`
        },
        required: [true, "subtotal required"]
    },
    subtotalWeight: {
        type: Number,
        default: 0.0,
        validate:{
            validator: (v: number) => {
                return v >= 0
            },
            message: `subtotal weight cannot less than 0!`
        },
        required: [true, "subtotal weight required"]
    }
});

const OrderItemModel = mongoose.model<OrderItem>('OrderItems', orderItemsSchema);

export {OrderItemModel}