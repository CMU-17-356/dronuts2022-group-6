import mongoose from 'mongoose'

const { Schema } = mongoose

enum EmployeePosition {
  CREW = 'crew',
  DELIVERER = 'deliverer',
  MANAGER = 'manager'
}

const employeeSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required']
  }, // Unique
  password: {
    type: String,
    required: [true, 'Password required']
  }, // Salted, Hashed Password
  fname: {
    type: String,
    required: [true, 'First Name required']
  },
  lname: {
    type: String,
    required: [true, 'First Name required']
  },
  email: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'not a valid email!'
    },
    required: [true, 'User email required']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: 'not a valid phone number!'
    },
    required: [true, 'User phone number required']
  },
  position: {
    type: String,
    default: EmployeePosition.CREW,
    enum: Object.values(EmployeePosition),
    required: [true, 'Position required']
  }
})

const EmployeeModel = mongoose.model('Employee', employeeSchema)
export { EmployeeModel, EmployeePosition }
