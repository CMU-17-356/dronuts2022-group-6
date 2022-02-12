import mongoose from 'mongoose';

const { Schema } = mongoose;

const donutSchema = new Schema({
    "name": String, //Unique. Donut Name
    "description": String, //Description of Donut
    "price": Number, //Price of individual donut
    "quantity_left": Number, //number of donuts left in inventory
    "weight": Number //weight of individual donut. in ounces
});

module.exports = mongoose.model('Donut', donutSchema);