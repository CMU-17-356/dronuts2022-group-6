import mongoose from 'mongoose';

const { Schema } = mongoose;

enum EmployeePosition {
    "CREW",
    "DELIVERER",
    "MANAGER"
}

const employeeSchema = new Schema({
    "username": String, //Unique
    "password": String, //Salted, Hashed Password
    "fname": String,
    "lname": String,
    "email": String,
    "primary_task": {
        type: String,
        default: EmployeePosition.CREW,
        enum: EmployeePosition
     },
    "secondary_task": {
        type: String,
        default: EmployeePosition.CREW,
        enum: EmployeePosition
     }
});

module.exports = mongoose.model('Employee', employeeSchema);
