/* eslint linebreak-style: ["error", "unix"] */

import { describe } from '@jest/globals';
import TrainingDrill from '../src/drill'; // Part
// import Training from '../src/training';

describe('Training drills logs', () => {
	// let newTraining
	let newDrill

	beforeEach(() => {
		// newTraining = new Training("Evelyn Hugo Colosseum")
		newDrill = new TrainingDrill();
	});

	describe('Drills with required fields', () => {
		test('should return a data type of the sum as number, not string', () => {
			const expected = 'number';
			const actual = typeof newDrill.calculateTotalDuration();
			expect(actual).toBe(expected);
		});

		test('should have .dateTime property', () => {
			expect(
				Object.hasOwn(newDrill, 'dateTime'),
			).toBeTruthy();
		});

		test('should have .swimTime property', () => {
			expect(
				Object.hasOwn(newDrill, 'swimTime'),
			).toBeTruthy();
		});

		test('should have .runTime property', () => {
			expect(
				Object.hasOwn(newDrill, 'runTime'),
			).toBeTruthy();
		});

		test('should have .bikeTime property', () => {
			expect(
				Object.hasOwn(newDrill, 'bikeTime'),
			).toBeTruthy();
		});
	});

	describe('Handle all undefined or omitted parameters with default values', () => {
		const unknown = undefined;
		newDrill = new TrainingDrill(unknown);

		test('should return a 0.00 total duration', () => {
			const expected = 0.00;
			const actual = newDrill.calculateTotalDuration();
			expect(actual).toBe(expected);
		});

		describe('return correct values with handled missing parameters', () => {
			let testSwim = 55.64;
			let testRun = 192.3;
			let testBike = 2454.431;

			test('return correct sum with default swimtime value used', () => {
				newDrill = new TrainingDrill(new Date('March 3, 2023 13:11'), unknown, testRun, testBike);
				const expected = 0.74;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});

			test('return correct sum with default runtime value used', () => {
				newDrill = new TrainingDrill(new Date('March 3, 2023 13:11'), testSwim, unknown, testBike);
				const expected = 0.70;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});

			test('return correct sum with default bikeTime value used', () => {
				newDrill = new TrainingDrill(new Date('March 3, 2023 13:11'), testSwim, testRun, unknown);
				const expected = 0.07;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});
			
			test('should handle omitted bikeTime value', () => {
				newDrill = new TrainingDrill(new Date('March 3, 2023 13:11'), testSwim, testRun);
				const expected = 0.07;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});
		})
	})

	describe('Has complete parameters, return correct values', () => {
		const dateString = 'April 12, 2023 '
		const timeString = '13:11'
		let testSwim = 55.64;
		let testRun = 192.3;
		let testBike = 2454.431;

		test('should extract the right time', () => {
			newDrill = new TrainingDrill(new Date('March 3, 2023 13:11'));
			newDrill.formatTime()
			const actual = newDrill.time
			const expected = '13:11'
			expect(actual).toBe(expected)
		});

		test('should return the correct string and correct date format', () => {
			newDrill = new TrainingDrill(new Date('April 12, 2023 13:11'), testSwim, testRun, testBike);
			let expected = "[Date: April 12, 2023 Drill Start Time: 13:11]\n"
			expected += "Swimming - 55.64 seconds\n"
			expected += "Running - 192.30 seconds\n"
			expected += "Cycling - 2454.43 seconds"
			const actual = newDrill.toString();
			expect(actual).toBe(expected);
		});

		test('should return an hour duration of  0.75, overriding default values', () => {
			newDrill = new TrainingDrill(new Date(dateString + timeString), testSwim, testRun, testBike);
			const expected = 0.75; // 2599.10
			const actual = parseFloat(newDrill.calculateTotalDuration().toFixed(2));
			expect(actual).toBe(expected);
		});
	});
	
	describe('sample drill with speed calculation', () => {
		let sampleDateTime = new Date("July 6, 2023 09:22")
		test('should calculate speed', () => {
			newDrill = new TrainingDrill(sampleDateTime, 64.7, 204.07, 2403.22);
			const expected = 35.77; // Kph
			const actual = newDrill.calculateSpeed();
			expect(actual).toBe(expected);
		});

		test('should return true if target duration is above the 37.16kph threshold', () => {
			newDrill = new TrainingDrill(sampleDateTime, 17.5, 119.2, 62.213);
			const expected = true;
			const actual = newDrill.isGoalReached();
			expect(actual).toBe(expected);
		});
		
		test('should return false if target duration is lower than the 37.16kph threshold', () => {
			newDrill = new TrainingDrill(sampleDateTime, 34.2, 423.7, 4880.0);
			const expected = false;
			const actual = newDrill.isGoalReached();
			expect(actual).toBe(expected);
		});

		test('should return false if target duration is just below the 37.16kph threshold', () => {
			newDrill = new TrainingDrill(sampleDateTime, 25.7, 249.2, 2620);
			const expected = false;
			const actual = newDrill.isGoalReached();
			expect(actual).toBe(expected);
		});
	});
});
