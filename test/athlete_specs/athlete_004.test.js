/* eslint-disable no-undef */
/* eslint no-undef: "error" */

import Triathlon from '../../src/triathlon.js'
import Athlete from '../../src/athlete.js'

describe('Modifying athlete values and saving or discarding changes.', () => {
    let newAthlete
    let theTriathlon

    describe('Valid data type and fields provided and errors handled', () => {
        beforeEach(() => {
            let testId = "03"
            let firstName = "John"
            let lastName = "Doe"
            let age = 26
            theTriathlon = new Triathlon()
            newAthlete = new Athlete(testId, firstName, lastName, age, null, null, null, theTriathlon)
        })

        test('Invalid field error', () => {
            const targetField = "nonExistentField"
            const newValue = "Johnny"
            const expectedError = "Invalid field to update"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).toThrow(expectedError)
        })

        test('Data type error', () => {
            const targetField = 123
            const newValue = "Johnathan"
            const expectedError = "Field must be a string"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).toThrow(expectedError)
        })

        test('New value data type error', () => {
            const targetField = "firstname"
            const newValue = 123
            const expectedError = "New value must be a string"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).toThrow(expectedError)
        })

        test('No error for new age value that is numeric', () => {
            const targetField = "age"
            const newValue = 24
            const expectedError = "New value must be a string"
            expect(() => newAthlete.editAthleteData(targetField, newValue)).not.toThrow(expectedError)
        })
    })

    describe('Implementing discard and save changes', () => {
        let targetField
        let newValue
        let decision

        beforeEach(() => {
            theTriathlon = new Triathlon()
            newAthlete = new Athlete("03", "John", "Doe", 26, 0.34, 0.64, 1.98, theTriathlon)  
        })

        test('should save firstname value change if change decision is true', () => {
            targetField = "firstName"
            newValue = "Johnathan"
            decision = true
            newAthlete.editAthleteData(targetField, newValue, decision)
            expect(newAthlete.firstName).toBe(newValue)
        })

        test('should save lastname value change if change decision is true', () => {
            targetField = "lastName"
            newValue = "Magnusson"
            decision = true
            newAthlete.editAthleteData(targetField, newValue, decision)
            expect(newAthlete.lastName).toBe(newValue)
        })

        test('should save age value change if change decision is true', () => {
            targetField = "age"
            newValue = 45
            decision = true
            newAthlete.editAthleteData(targetField, newValue, decision)
            expect(newAthlete.age).toBe(newValue)
        })

        test('should discard value change if change decision is false', () => {
            targetField = "firstName"
            newValue = "Evelyn"
            decision = false
            newAthlete.editAthleteData(targetField, newValue, decision)
            expect(newAthlete.firstName).toBe("John")
        })
        
        test('should allow a chain of lastname value change take effect', () => {
            targetField = "lastName"
            // first modification
            newAthlete.editAthleteData(targetField, "Hugo", true)
            expect(newAthlete.lastName).toBe("Hugo")
            // second modification
            newAthlete.editAthleteData(targetField, "Adler", false)
            expect(newAthlete.lastName).toBe("Hugo")
            // third modification
            newAthlete.editAthleteData(targetField, "St.James", true)
            expect(newAthlete.lastName).toBe("St.James")
        })

        test('should display correct latest values in a string', () => {
            newAthlete.editAthleteData("firstName", "Evelyn", true)
            newAthlete.editAthleteData("lastName", "Hugo", true)
            newAthlete.editAthleteData("age", 13, false)
            const actual = newAthlete.toString()
            const expected = "[Athlete No.03] Evelyn Hugo\nAge: 26 Speed: 31.59 kph\nSwimming - 0.34 hours\nRunning - 0.64 hours\nCycling - 1.98 hours"
            expect(actual).toBe(expected)
        })
    })
})