import mongoose from 'mongoose'
import { DonutModel } from '../../schema/donutSchema'

describe('Testing Donut Schema ', function () {
  test('should allow to make donut acc w valid fields', function () {
    const correctDonut = new DonutModel({
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: 2.50,
      quantity_left: 10,
      weight: 1
    })

    const correctResult = correctDonut.validateSync()
    expect(correctResult).toBeUndefined()
    expect(correctDonut.name).toBe('Glazed Donut')
    expect(correctDonut.description).toBe('A classic, sweet glazed donut')
    expect(correctDonut.price).toBe(2.50)
    expect(correctDonut.quantity_left).toBe(10)
    expect(correctDonut.weight).toBe(1)
  })
  test('should have validation error for empty fields', function () {
    const wrongDonut = new DonutModel({
    })

    const missingFieldError = wrongDonut.validateSync()

    expect(missingFieldError.errors.name).toBeDefined()
    expect(missingFieldError.errors.description).toBeDefined()
    expect(missingFieldError.errors.price).toBeDefined()
    expect(missingFieldError.errors.weight).toBeDefined()
    expect(wrongDonut.quantity_left).toBe(0)
  })
  test('should have validation error for negative price, weight, quantity', function () {
    const wrongDonut = new DonutModel({
      name: 'Glazed Donut',
      description: 'A classic, sweet glazed donut',
      price: -2.50,
      quantity_left: -10,
      weight: -1
    })

    const badNumberError = wrongDonut.validateSync()

    expect(badNumberError.errors.price).toBeDefined()
    expect(badNumberError.errors.quantity_left).toBeDefined()
    expect(badNumberError.errors.weight).toBeDefined()
  })
})
