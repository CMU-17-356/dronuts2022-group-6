import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import { CustomerModel } from '../schema/customerSchema';
import { DonutModel } from '../schema/donutSchema';
import { DroneModel, DroneStatus } from '../schema/droneSchema';
import { EmployeeModel, EmployeePosition } from '../schema/employeeSchema';

async function run(): Promise<void> {
    // Connect to MongoDB
    await connect('mongodb://localhost:27017/');
    
    // Customer
    const customer1 = new CustomerModel({
        username: "takholee",
        password: "ilovedonuts",
        fname: "Taco",
        lname: "Lee",
        email: "tacol@andrew.cmu.edu",
        phone: "412-996-5373"
    });
    await customer1.save();
    console.log(customer1.username);

    // Employee
    const employee1 = new EmployeeModel({
        username: "takhothemanager",
        password: "ilovedonuts",
        fname: "Takho",
        lname: "Lee",
        email: "takhol@andrew.cmu.edu",
        phone: "412-996-5313",
        position: EmployeePosition.MANAGER
    });
    await employee1.save();
    console.log(employee1.username);

    // donuts
    const glazedDonut = new DonutModel({
        name: "Glazed Donut",
        description: "A classic, sweet glazed donut",
        price: 2.50,
        quantity_left: 10,
        weight: 1
    });
    await glazedDonut.save();
    console.log(glazedDonut.name);

    const sprinkledDonut = new DonutModel({
        name: "Sprinkled Donut",
        description: "Our donut with sprinkles. It's pink!",
        price: 3.50,
        quantity_left: 5,
        weight: 1
    });

    await sprinkledDonut.save();
    console.log(sprinkledDonut.name);

    const jellyDonut = new DonutModel({
        name: "Jelly Donut",
        description: "Donut with strawberry jam in it. So sweet",
        price: 3.50,
        quantity_left: 3,
        weight: 1
    });

    await jellyDonut.save();
    console.log(jellyDonut.name);

    //drones
    const idleDrone = new DroneModel({
        weightLimit: 10,
        batteryStatus: 75,
        droneStatus: DroneStatus.IDLE
    });

    await idleDrone.save();
    console.log(idleDrone.droneStatus);

    const chargingDrone = new DroneModel({
        weightLimit: 15,
        batteryStatus: 75,
        droneStatus: DroneStatus.CHARGING
    });

    await chargingDrone.save();
    console.log(chargingDrone.droneStatus);

    const deliveringDrone = new DroneModel({
        weightLimit: 15,
        batteryStatus: 75,
        droneStatus: DroneStatus.ON_WAY_BACK_FROM_DELIVERY
    });

    await deliveringDrone.save();
    console.log(deliveringDrone.droneStatus);
  }





export { run }