import mongoose from "mongoose";
import { CustomerModel } from "../../schema/customerSchema";

describe('Testing Customer Schema ', function () {
    test('should allow to make customer acc w valid fields', function () {
        const correctCustomer = new CustomerModel({
            username: "takholee",
            password: "ilovedonuts",
            fname: "Takho",
            lname: "Lee",
            email: "takhol@andrew.cmu.edu",
            phone: "412-996-5373"
        });

        const correctResult = correctCustomer.validateSync()
        expect(correctResult).toBeUndefined()
        expect(correctCustomer.username).toBe("takholee")
        expect(correctCustomer.password).toBe("ilovedonuts")
        expect(correctCustomer.fname).toBe("Takho")
        expect(correctCustomer.email).toBe("takhol@andrew.cmu.edu")
        expect(correctCustomer.phone).toBe("412-996-5373")
    });
    test('should have validation error for empty fields', function () {
        const wrongCustomer = new CustomerModel({
        });

        const missingFieldError = wrongCustomer.validateSync()
        
        expect(missingFieldError.errors.username).toBeDefined()
        expect(missingFieldError.errors.password).toBeDefined()
        expect(missingFieldError.errors.fname).toBeDefined()
        expect(missingFieldError.errors.lname).toBeDefined()
        expect(missingFieldError.errors.email).toBeDefined()
        expect(missingFieldError.errors.phone).toBeDefined()
    });
    test('should have validation error for invalid email', function () {
        const wrongCustomer = new CustomerModel({
            username: "takholee",
            password: "ilovedonuts",
            fname: "Takho",
            lname: "Lee",
            email: "takholandrew.cmu.edu",
            phone: "412-996-5373"
        });

        const badEmailError = wrongCustomer.validateSync()

        expect(badEmailError.errors.email).toBeDefined()
    });

    test('should have validation error for invalid number', function () {
        const wrongCustomer = new CustomerModel({
            username: "takholee",
            password: "ilovedonuts",
            fname: "Takho",
            lname: "Lee",
            email: "takholandrew.cmu.edu",
            phone: "412-99373"
        });

        const badNumberError = wrongCustomer.validateSync()

        expect(badNumberError.errors.phone).toBeDefined()
    });
    
});