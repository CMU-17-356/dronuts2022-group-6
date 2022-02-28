import mongoose from 'mongoose'
import { Drone } from '../src/drone'

const { Schema } = mongoose

enum DroneStatus {
  ON_WAY_TO_DELIVERY = 'on way to deliver',
  ON_WAY_BACK_FROM_DELIVERY = 'on way back from delivery',
  IDLE = 'idle',
  CHARGING = 'charging',
  MAINTENACE = 'under maintenance'
}

const droneSchema = new Schema<Drone>({
  weightLimit: {
    type: Number,
    validate: {
      validator: (v: number) => {
        return v >= 0
      }
    },
    required: [true, 'weight limit required']
  }, // How much weight a drone can hold in ounces
  batteryStatus: {
    type: Number,
    validate: {
      validator: (v: number) => {
        return v >= 0 && v <= 100
      },
      message: 'battery status has to be between 0 and 100!'
    },
    required: [true, 'battery status required']
  }, // How much battery is left in drone in percentage
  droneStatus: {
    type: String,
    default: DroneStatus.IDLE,
    enum: Object.values(DroneStatus),
    required: [true, 'Drone Status required']
  }
})

const DroneModel = mongoose.model<Drone>('Drone', droneSchema)

export { droneSchema, DroneModel, DroneStatus }
