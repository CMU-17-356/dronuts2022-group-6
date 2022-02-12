import mongoose from 'mongoose';

const { Schema } = mongoose;

enum DroneStatus {
    ON_WAY_TO_DELIVERY = "on way to deliver",
    ON_WAY_BACK_FROM_DELIVERY = "on way back from delivery",
    IDLE = "idle",
    CHARGING = "charging",
    MAINTENACE= "under maintenance"
}

const droneSchema = new Schema({
    weightLimit: {
        type: Number,
        validate:{
            validator: (v) => {
                return v >= 0
            },
            message: `weight limit cannot less than 0!`
        },
        required: [true, "weight limit required"]
    }, //How much weight a drone can hold in ounces
    batteryStatus: {
        type: Number,
        validate:{
            validator: (v) => {
                return 0 <= v && v <= 100
            },
            message: `battery status has to be between 0 and 100!`
        },
        required: [true, "battery status required"]
    }, //How much battery is left in drone in percentage
    droneStatus: {
        type: String,
        default: DroneStatus.IDLE,
        enum: Object.values(DroneStatus),
        required: [true, "Drone Status required"]
     }
});

module.exports = mongoose.model('Drone', droneSchema);
export {droneSchema, DroneStatus}