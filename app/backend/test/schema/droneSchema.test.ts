import mongoose from "mongoose";
import { droneSchema } from "../../schema/droneSchema";

enum DroneStatus {
    ON_WAY_TO_DELIVERY = "on way to deliver",
    ON_WAY_BACK_FROM_DELIVERY = "on way back from delivery",
    IDLE = "idle",
    CHARGING = "charging",
    MAINTENACE= "under maintenance"
}

const Drone = mongoose.model('Drone', droneSchema)
describe('Testing Drone Schema ', function () {
    test('should allow to make drone acc w valid fields', function () {
        const correctDrone = new Drone({
            weightLimit: 10,
            batteryStatus: 75,
            droneStatus: DroneStatus.CHARGING
        });

        const correctResult = correctDrone.validateSync()
        expect(correctResult).toBeUndefined()
        expect(correctDrone.weightLimit).toBe(10)
        expect(correctDrone.batteryStatus).toBe(75)
        expect(correctDrone.droneStatus).toBe("charging")
    });
    test('should have validation error for empty fields', function () {
        const wrongDrone = new Drone({
        });

        const missingFieldError = wrongDrone.validateSync()
        
        expect(missingFieldError.errors.weightLimit).toBeDefined()
        expect(missingFieldError.errors.batteryStatus).toBeDefined()
        expect(wrongDrone.droneStatus).toBe("idle")
    });
    test('should have validation error for negative weightLimit, battery', function () {
        const wrongDrone = new Drone({
            weightLimit: -10,
            batteryStatus: -75,
            droneStatus: DroneStatus.CHARGING
        });

        const badNumberError = wrongDrone.validateSync()

        expect(badNumberError.errors.weightLimit).toBeDefined()
        expect(badNumberError.errors.batteryStatus).toBeDefined()
    });
    
});