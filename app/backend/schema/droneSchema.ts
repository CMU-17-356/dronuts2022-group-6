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
    "weight_limit": Number, //How much weight a drone can hold in ounces
    "battery_status": Number, //How much battery is left in drone in percentage
    "primary_task": {
        type: String,
        default: DroneStatus.IDLE,
        enum: DroneStatus
     }
});

module.exports = mongoose.model('Drone', droneSchema);
