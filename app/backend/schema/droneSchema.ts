import mongoose from 'mongoose';

const { Schema } = mongoose;

enum DroneStatus {
    "ON_WAY_TO_DELIVERY",
    "ON_WAY_BACK_FROM_DELIVERY",
    "IDLE",
    "CHARGING",
    "MAINTENACE"
}

const droneSchema = new Schema({
    "weight_limit": {
        type: Number,
        required: [true, "weight limit required"]
    }, //How much weight a drone can hold in ounces
    "battery_status": {
        type: Number,
        required: [true, "batter status required"]
    }, //How much battery is left in drone in percentage
    "drone_status": {
        type: String,
        default: DroneStatus.IDLE,
        enum: DroneStatus
     }
});

module.exports = mongoose.model('Drone', droneSchema);
export {droneSchema, DroneStatus}