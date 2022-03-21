import mongoose from 'mongoose';
import { DroneModel, DroneStatus} from '../../schema/droneSchema'
import { getAvailableDrones, getAllDrones } from '../../src/drone'

describe('Testing Drone.ts ', function () {
    test('getAllDrones Work Properly', async function () {
      await mongoose.connect('mongodb://localhost:27017/');
      await DroneModel.deleteMany({})
      const drone1 = new DroneModel({
        weightLimit: 10,
        batteryStatus: 75,
        droneStatus: DroneStatus.IDLE
      })
      await drone1.save()
  
      const drone2 = new DroneModel({
        weightLimit: 7.5,
        batteryStatus: 100,
        droneStatus: DroneStatus.CHARGING
      })
      await drone2.save()
  
      return getAllDrones().then((thisDrones) => {
        
        expect(thisDrones.length).toEqual(2)
        mongoose.disconnect(); 
      })
    })
    test('getAllDrones Work Properly', async function () {
        await mongoose.connect('mongodb://localhost:27017/');
        await DroneModel.deleteMany({})
        const drone1 = new DroneModel({
          weightLimit: 10,
          batteryStatus: 75,
          droneStatus: DroneStatus.IDLE
        })
        await drone1.save()
    
        const drone2 = new DroneModel({
          weightLimit: 7.5,
          batteryStatus: 100,
          droneStatus: DroneStatus.CHARGING
        })
        await drone2.save()
    
        return getAllDrones().then((thisDrones) => {
          
          expect(thisDrones.length).toEqual(2)
        })
      })

      test('getDronesAvailable Work Properly', async function () {
        await DroneModel.deleteMany({})
        const drone1 = new DroneModel({
          weightLimit: 10,
          batteryStatus: 75,
          droneStatus: DroneStatus.IDLE
        })
        await drone1.save()
    
        const drone2 = new DroneModel({
          weightLimit: 7.5,
          batteryStatus: 100,
          droneStatus: DroneStatus.CHARGING
        })

        const drone3 = new DroneModel({
            weightLimit: 7.5,
            batteryStatus: 20,
            droneStatus: DroneStatus.CHARGING
          })
        await drone2.save()
    
        return getAvailableDrones().then((thisDrones) => {
          
          expect(thisDrones.length).toEqual(2)
          mongoose.disconnect(); 
        })
      })
  })
  