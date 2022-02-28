import mongoose from 'mongoose'
const { Schema } = mongoose

const addressSchema = new Schema({
  address_id: Number, // Unique
  street_address_1: String,
  street_address_2: String,
  city: String,
  state: String,
  zipcode: String,
  customer: [
    { type: Schema.Types.ObjectId, ref: 'Customer' }
  ] // Foreign key to object.
})

const AddressModel = mongoose.model('Address', addressSchema)
export { AddressModel }
