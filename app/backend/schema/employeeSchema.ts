import mongoose from 'mongoose';

const { Schema } = mongoose;

enum EmployeePosition {
    "CREW",
    "DELIVERER",
    "MANAGER"
}

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const employeeSchema = new Schema({
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
        required: [true, "First Name required"]
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
    position: {
        type: String,
        default: EmployeePosition.CREW,
        enum: EmployeePosition,
        required: [true, "Position required"]
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
export { employeeSchema, EmployeePosition}
