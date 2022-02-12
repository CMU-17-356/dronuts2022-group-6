import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
    "username": String, //Unique
    "password": String, //Salted, Hashed Password
    "fname": String,
    "lname": String,
    "email": String,
    "addresses":  [
        {type: Schema.Types.ObjectId, ref: 'Address'}
      ]
});

module.exports = mongoose.model('Customer', customerSchema);
