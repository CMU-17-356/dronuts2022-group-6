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
        required: [true, "price required"]
    },
    quantity_left: {
        type: Number,
        required: [true, "quantity left required"]
    },
    weight: {
        type: Number,
        required: [true, "weight required"]
    },
});

module.exports = mongoose.model('Donut', donutSchema);
export {donutSchema}