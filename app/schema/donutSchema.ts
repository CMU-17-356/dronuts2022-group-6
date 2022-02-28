import mongoose from 'mongoose';

const { Schema } = mongoose;

const donutSchema = new Schema({
    name: {
        type: String,
        required: [true, "Donut Name required"]
    }, //Unique
    description: {
        type: String,
        required: [true, "description required"]
    }, //Salted, Hashed Password
    price: {
        type: Number,
        validate:{
            validator: (v: number) => {
                return v >= 0
            },
            message: `price cannot less than 0!`
        },
        required: [true, "price required"]
    },
    quantity_left: {
        type: Number,
        default: 0,
        validate:{
            validator: (v: number) => {
                return v >= 0
            },
            message: `quantity left cannot less than 0!`
        },
        required: [true, "quantity left required"]
    },
    weight: {
        type: Number,
        validate:{
            validator: (v: number) => {
                return v >= 0
            },
            message: `weight cannot less than 0!`
        },
        required: [true, "weight required"]
    },
});

const DonutModel = mongoose.model('Donut', donutSchema);
export {DonutModel}