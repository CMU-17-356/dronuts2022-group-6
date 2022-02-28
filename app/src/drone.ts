import { DroneModel } from "../schema/droneSchema"

enum DroneStatus {
    ON_WAY_TO_DELIVERY = 'on way to deliver',
    ON_WAY_BACK_FROM_DELIVERY = 'on way back from delivery',
    IDLE = 'idle',
    CHARGING = 'charging',
    MAINTENACE = 'under maintenance'
}

interface Drone {
    weightLimit: number
    batteryStatus: number
    droneStatus: DroneStatus
}

async function getAvailableDrones(): Promise<any> {
    return DroneModel.find({}).then((result) => {

        console.log(typeof result)
        let jsonArray = []

        result.forEach((drone) => {
            if (drone.droneStatus === DroneStatus.IDLE || (drone.droneStatus === DroneStatus.CHARGING && drone.batteryStatus >= 50)) {
                jsonArray.push(drone)
            }
        })

        return jsonArray
    })
}

async function getAllDrones(): Promise<any> {
    return DroneModel.find({}).then((result) => {

        return result
    })
}

export { DroneStatus, Drone, getAvailableDrones, getAllDrones }