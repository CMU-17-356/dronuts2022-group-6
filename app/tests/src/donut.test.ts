import mongoose from 'mongoose';
import { DonutModel } from '../../schema/donutSchema'
import { changeDonutQuantity, getAllDonuts } from '../../src/donut'

describe('Testing Donut.ts ', function () {

  test('add quantities appropriately', async function () {
    await mongoose.connect('mongodb://localhost:27017/');
    const correctDonut = new DonutModel({
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: 2.50,
      quantity_left: 10,
      weight: 1
    })
    await correctDonut.save()


    correctDonut._id

    return changeDonutQuantity(correctDonut._id, 5, true).then((thisDonut) => {
      
      expect(thisDonut.quantity_left).toBe(15)
    })
  })
  test('subtract quantities appropriately', async function () {

    const correctDonut = new DonutModel({
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: 2.50,
      quantity_left: 10,
      weight: 1
    })
    await correctDonut.save()

    const donutID = correctDonut._id

    return changeDonutQuantity(donutID, 5, false).then((thisDonut) => {
      expect(thisDonut.quantity_left).toBe(5)
      mongoose.disconnect();

    })
  })


  test('getAllDonuts Work Properly', async function () {
    await mongoose.connect('mongodb://localhost:27017/');
    await DonutModel.deleteMany({})
    const correctDonut = new DonutModel({
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: 2.50,
      quantity_left: 10,
      weight: 1
    })
    await correctDonut.save()

    const correctDonut2 = new DonutModel({
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: 2.50,
      quantity_left: 10,
      weight: 1
    })
    await correctDonut2.save()


    correctDonut._id

    return getAllDonuts().then((thisDonuts) => {
      
      expect(thisDonuts.length).toEqual(2)
      mongoose.disconnect(); 
    })
  })
})
