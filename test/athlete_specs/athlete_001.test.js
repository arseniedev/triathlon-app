/* eslint-disable no-undef */
/* eslint no-undef: "error" */

import Athlete from '../../src/athlete.js'

describe('Training Athletes logs', () => {
	let newAthlete
	beforeEach(() => {
		newAthlete = new Athlete()
	})

	describe('Athletes with required properties', () => {
		test('should have .id property', () => {
			expect(
				Object.hasOwn(newAthlete, 'id'),
			).toBeTruthy()
		})

		test('should have .firstName property', () => {
			expect(
				Object.hasOwn(newAthlete, 'firstName'),
			).toBeTruthy()
		})

		test('should have .lastName property', () => {
			expect(
				Object.hasOwn(newAthlete, 'lastName'),
			).toBeTruthy()
		})

		test('should have .age property', () => {
			expect(
				Object.hasOwn(newAthlete, 'age'),
			).toBeTruthy()
		})

		test('should have .swimTime property', () => {
			expect(
				Object.hasOwn(newAthlete, 'swimTime'),
			).toBeTruthy()
		})

		test('should have .runTime property', () => {
			expect(
				Object.hasOwn(newAthlete, 'runTime'),
			).toBeTruthy()
		})

		test('should have .bikeTime property', () => {
			expect(
				Object.hasOwn(newAthlete, 'bikeTime'),
			).toBeTruthy()
		})
	})
})
