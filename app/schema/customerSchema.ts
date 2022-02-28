import mongoose from 'mongoose';

const { Schema } = mongoose;


const customerSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required"]
  }, //Unique
  password: {
    type: String,
    required: [true, "Password required"]
  }, //Salted, Hashed Password
  fname: {
    type: String,
    required: [true, "First Name required"]
  },
  lname: {
    type: String,
    required: [true, "Last Name required"]
  },
  email: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      }
    },
    required: [true, 'User email required']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      }
    },
    required: [true, 'User phone number required']
  },
  addresses: [
    { type: Schema.Types.ObjectId, ref: 'Address' }
  ]
});

const CustomerModel = mongoose.model('Customer', customerSchema);

export { customerSchema, CustomerModel }