import mongoose from 'mongoose';

const { Schema } = mongoose;

enum EmployeePosition {
    CREW = "crew",
    DELIVERER = "deliverer",
    MANAGER = "manager"
}

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
        type: String,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
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
        enum: Object.values(EmployeePosition),
        required: [true, "Position required"]
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
export { employeeSchema, EmployeePosition }
