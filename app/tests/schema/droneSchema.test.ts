import { DroneModel, DroneStatus } from '../../schema/droneSchema'

describe('Testing Drone Schema ', function () {
  test('should allow to make drone acc w valid fields', function () {
    const correctDrone = new DroneModel({
      weightLimit: 10,
      batteryStatus: 75,
      droneStatus: DroneStatus.CHARGING
    })

    const correctResult = correctDrone.validateSync()
    expect(correctResult).toBeUndefined()
    expect(correctDrone.weightLimit).toBe(10)
    expect(correctDrone.batteryStatus).toBe(75)
    expect(correctDrone.droneStatus).toBe('charging')
  })
  test('should have validation error for empty fields', function () {
    const wrongDrone = new DroneModel({
    })

    const missingFieldError = wrongDrone.validateSync()

    expect(missingFieldError.errors.weightLimit).toBeDefined()
    expect(missingFieldError.errors.batteryStatus).toBeDefined()
    expect(wrongDrone.droneStatus).toBe('idle')
  })
  test('should have validation error for negative weightLimit, battery', function () {
    const wrongDrone = new DroneModel({
      weightLimit: -10,
      batteryStatus: -75,
      droneStatus: DroneStatus.CHARGING
    })

    const badNumberError = wrongDrone.validateSync()

    expect(badNumberError.errors.weightLimit).toBeDefined()
    expect(badNumberError.errors.batteryStatus).toBeDefined()
  })
})
