import { Schema, model, connect } from 'mongoose';
import mongoose from "mongoose";
import { CustomerModel } from '../schema/customerSchema';

async function run(): Promise<void> {
    // 4. Connect to MongoDB
    await connect('mongodb://localhost:27017/');
  
    const doc = new CustomerModel({
        username: "takholee",
        password: "ilovedonuts",
        fname: "Takho",
        lname: "Lee",
        email: "takhol@andrew.cmu.edu",
        phone: "412-996-5373"
    });
    await doc.save();
  
    console.log(doc.email); // 'bill@initech.com'
  }

export { run }