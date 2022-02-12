import mongoose from 'mongoose';

const { Schema } = mongoose;

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

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
    type: {
      type: String,
      required: [true, "Last Name required"]
    },
    validate: {
      validator: function (v: string) {
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'User phone number required']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  addresses: [
    { type: Schema.Types.ObjectId, ref: 'Address' }
  ]
});

module.exports = mongoose.model('Customer', customerSchema);

export { customerSchema }