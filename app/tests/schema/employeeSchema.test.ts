import mongoose from 'mongoose'
import { EmployeeModel, EmployeePosition } from '../../schema/employeeSchema'

describe('Testing Employee Schema ', function () {
  test('should allow to make Employee acc w valid fields', function () {
    const correctEmployee = new EmployeeModel({
      username: 'takholee',
      password: 'ilovedonuts',
      fname: 'Takho',
      lname: 'Lee',
      email: 'takhol@andrew.cmu.edu',
      phone: '412-996-5373',
      position: EmployeePosition.MANAGER
    })

    const correctResult = correctEmployee.validateSync()
    expect(correctResult).toBeUndefined()
    expect(correctEmployee.username).toBe('takholee')
    expect(correctEmployee.password).toBe('ilovedonuts')
    expect(correctEmployee.fname).toBe('Takho')
    expect(correctEmployee.email).toBe('takhol@andrew.cmu.edu')
    expect(correctEmployee.phone).toBe('412-996-5373')
    expect(correctEmployee.position).toBe('manager')
  })
  test('should have validation error for empty fields except employee position', function () {
    const wrongEmployee = new EmployeeModel({
    })

    const missingFieldError = wrongEmployee.validateSync()

    expect(missingFieldError.errors.username).toBeDefined()
    expect(missingFieldError.errors.password).toBeDefined()
    expect(missingFieldError.errors.fname).toBeDefined()
    expect(missingFieldError.errors.lname).toBeDefined()
    expect(missingFieldError.errors.email).toBeDefined()
    expect(missingFieldError.errors.phone).toBeDefined()
    expect(wrongEmployee.position).toBe('crew')
  })
  test('should have validation error for invalid email', function () {
    const wrongEmployee = new EmployeeModel({
      username: 'takholee',
      password: 'ilovedonuts',
      fname: 'Takho',
      lname: 'Lee',
      email: 'takholandrew.cmu.edu',
      phone: '412-996-5373'
    })

    const badEmailError = wrongEmployee.validateSync()

    expect(badEmailError.errors.email).toBeDefined()
  })

  test('should have validation error for invalid number', function () {
    const wrongCustomer = new EmployeeModel({
      username: 'takholee',
      password: 'ilovedonuts',
      fname: 'Takho',
      lname: 'Lee',
      email: 'takholandrew.cmu.edu',
      phone: '412-99373'
    })

    const badNumberError = wrongCustomer.validateSync()

    expect(badNumberError.errors.phone).toBeDefined()
  })
})
