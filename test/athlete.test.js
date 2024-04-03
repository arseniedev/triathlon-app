// triathlon 1.2
/* eslint linebreak-style: ["error", "unix"] */

import Athlete from '../src/athlete'; // Whole
// import Training from '../src/training'; // Part

describe('Athlete', () => {
	let theAthlete;
	beforeEach(() => {
		// newFirstName, newLastName, newAge, newDistanceRequirement, newTargetSpeed
		theAthlete = new Athlete("Celia", "St. James", 32, 26.55, 39);
		theAthlete.addTraining(new Date("February 3, 2024"), "Place 1")
		theAthlete.addTraining(new Date("January 23, 2023"), "Place 2")
	});

	describe('Drills with required fields', () => {
		test('should have .firstname property', () => {
			expect(
				Object.hasOwn(theAthlete, 'firstname'),
			).toBeTruthy();
		});

		test('should have .lastname property', () => {
			expect(
				Object.hasOwn(theAthlete, 'lastname'),
			).toBeTruthy();
		});

		test('should have .distance property', () => {
			expect(
				Object.hasOwn(theAthlete, 'distance'),
			).toBeTruthy();
		});
		
		test('should have .speed property', () => {
			expect(
				Object.hasOwn(theAthlete, 'speed'),
			).toBeTruthy();
		});
	});

	describe('test getAll training & drills', () => {
		test('getAll', () => {
			const expected = ""
			const actual = theAthlete.getAllDrills();
			expect(actual).toBe(expected);
		});

	});
});
