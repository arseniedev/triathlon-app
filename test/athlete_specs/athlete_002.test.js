/* eslint-disable no-undef */
/* eslint no-undef: "error" */

import Athlete from '../../src/athlete.js'
import Triathlon from '../../src/triathlon.js'

describe('Mandatory parameters provided and correct values returned', () => {
	let newAthlete
	let theTriathlon
	beforeEach(() => {
		const testId = '03'
		const firstName = 'John'
		const lastName = 'Doe'
		const age = 26
		const swimTime = 0.47
		const runTime = 0.62
		const bikeTime = 2.13
		theTriathlon = new Triathlon(null, null)
		newAthlete = new Athlete(testId, firstName, lastName, age, swimTime, runTime, bikeTime, theTriathlon)
	})

	test('should return the correct string and correct date format', () => {
		const expected = '[Athlete No.03] John Doe\nAge: 26 Speed: 29.04 kph\nSwimming - 0.47 hours\nRunning - 0.62 hours\nCycling - 2.13 hours'
		const actual = newAthlete.toString()
		expect(actual).toBe(expected)
	})

	test('should return an hour duration of  3.22', () => {
		const expected = 3.22
		const actual = parseFloat(newAthlete.calculateTotalDuration().toFixed(2))
		expect(actual).toBe(expected)
	})

	test('should return a data type of the sum as number, not string', () => {
		const expected = 'number'
		const actual = typeof newAthlete.calculateTotalDuration()
		expect(actual).toBe(expected)
	})

	test('should be able to retrieve triathlon total distance of 93.5', () => {
		const actual = theTriathlon.calculateTotalDistance()
		const expected = 93.5
		expect(actual).toBe(expected)
	})

	test('should calculate speed of 29.04', () => {
		const actual = newAthlete.calculateSpeedKph()
		const expected = 29.04
		expect(actual).toBe(expected)
	})

	test('should return a data type of the sum as number, not string', () => {
		const expected = 'number'
		const actual = typeof newAthlete.calculateSpeedKph()
		expect(actual).toBe(expected)
	})
})
