/* triathlon 1.1 */
/* eslint linebreak-style: ["error", "unix"] */

import { describe } from '@jest/globals';
import TrainingDrill from '../src/drill'; // Part
import Training from '../src/training';

describe('Training drills logs', () => {
	let newTraining
	let newDrill
	let testDateTime

	beforeEach(() => {
		newTraining = new Training("Evelyn Hugo Colosseum")
		newDrill = new TrainingDrill();
		testDateTime = new Date(2024,3,12,13,11) 
	});

	describe('Drills with required fields', () => {
		test('should return a data type of the sum as number, not string', () => {
			const expected = 'number';
			const actual = typeof newDrill.calculateTotalDuration();
			expect(actual).toBe(expected);
		});

		test('should have .dateTimeId property', () => {
			expect(
				Object.hasOwn(newDrill, 'dateTimeId'),
			).toBeTruthy();
		});

		test('should have .date property', () => {
			expect(
				Object.hasOwn(newDrill, 'date'),
			).toBeTruthy();
		});

		test('should have .time property', () => {
			expect(
				Object.hasOwn(newDrill, 'time'),
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

		test('use default date value April 5, 2024', () => {
			const dateTimeOutput = newDrill.formatDateTime();
			const expected = 'April 5, 2024';
			const actual = dateTimeOutput['date']
			expect(actual).toBe(expected);
		});

		test('use default time value 00:00', () => {
			const dateTimeOutput = newDrill.formatDateTime();
			const expected = '00:00';
			const actual = dateTimeOutput['time']
			expect(actual).toBe(expected);
		});

		test('should return a 0.00 total duration', () => {
			const expected = 0.00;
			const actual = newDrill.calculateTotalDuration();
			expect(actual).toBe(expected);
		});

		describe('return correct values with handled missing parameters', () => {
			const testSwim = 55.64;
			const testRun = 192.3;
			const testBike = 2454.431;

			test('return correct sum with default swimtime value used', () => {
				newDrill = new TrainingDrill(testDateTime, unknown, testRun, testBike);
				const expected = 0.74;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});

			test('return correct sum with default runtime value used', () => {
				newDrill = new TrainingDrill(testDateTime, testSwim, unknown, testBike);
				const expected = 0.70;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});

			test('return correct sum with default bikeTime value used', () => {
				newDrill = new TrainingDrill(testDateTime, testSwim, testRun, unknown);
				const expected = 0.07;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});
			
			test('should handle omitted bikeTime value', () => {
				newDrill = new TrainingDrill(testDateTime, testSwim, testRun);
				const expected = 0.07;
				const actual = newDrill.calculateTotalDuration();
				expect(actual).toBeCloseTo(expected, 2);
			});
		})
	})

	describe('Has complete parameters, return correct values', () => {
		const testSwim = 55.64;
		const testRun = 192.3;
		const testBike = 2454.431;

		test('should extract the right time', () => {
			newDrill = new TrainingDrill(testDateTime, testSwim, testRun, testBike);
			const dateTimeOutput = newDrill.formatDateTime();
			expect(dateTimeOutput['date']).toBe('April 12, 2024');
			expect(dateTimeOutput['time']).toBe('13:11');
		});

		test('should return the correct string and correct date format', () => {
			newDrill = new TrainingDrill(testDateTime, testSwim, testRun, testBike);
			const expected = '\n[Date: April 12, 2024 Drill Start Time: 13:11]\nSwimming - 55.64 seconds\nRunning - 192.30 seconds\nCycling - 2454.43 seconds';
			const actual = newDrill.toString();
			expect(actual).toBe(expected);
		});

		test('should return an hour duration of  0.75, overriding default values', () => {
			newDrill = new TrainingDrill(testDateTime, testSwim, testRun, testBike);
			const expected = 0.75; // 2599.10
			const actual = parseFloat(newDrill.calculateTotalDuration().toFixed(2));
			expect(actual).toBe(expected);
		});
	});
	
	describe('sample drill with speed calculation', () => {
		let distance = newTraining.distance
		let targetSpeed = newTraining.speed
		test('should calculate speed', () => {
			newDrill = new TrainingDrill(testDateTime, 64.7, 204.07, 2403.22);
			const expected = 35.77; // Kph
			const actual = newDrill.calculateSpeed(distance);
			expect(actual).toBe(expected);
		});

		test('should return true if target duration is above the 37.16kph threshold', () => {
			newDrill = new TrainingDrill(testDateTime, 17.5, 119.2, 62.213);
			const expected = true;
			const actual = newDrill.isGoalReached(distanceKm,targetSpeed);
			expect(actual).toBe(expected);
		});
		
		test('should return false if target duration is lower than the 37.16kph threshold', () => {
			newDrill = new TrainingDrill(testDateTime, 34.2, 423.7, 4880.0);
			const expected = false;
			const actual = newDrill.isGoalReached();
			expect(actual).toBe(expected);
		});

		test('should return false if target duration is just below the 37.16kph threshold', () => {
			newDrill = new TrainingDrill('12:30', 25.7, 249.2, 2620);
			const expected = false;
			const actual = newDrill.isGoalReached();
			expect(actual).toBe(expected);
		});
	});
});
