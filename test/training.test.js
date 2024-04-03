/* eslint linebreak-style: ["error", "unix"] */
// /*** @jest-environment jsdom */

import Training from '../src/training'; // Whole
import TrainingDrill from '../src/drill'; // Part

describe('Training logs', () => {
	let theTraining;
	let testDateTime
	let testLocation

	beforeEach(() => {
		theTraining = new Training();
	});

	describe('An empty training log', () => {
		test('should have a .location property', () => {
			expect(
				Object.hasOwn(theTraining, 'location'),
			).toBeTruthy();
		});

		test('should have a drill count of 0', () => {
			const count = theTraining.drillCount;
			expect(count).toBe(0);
		});

		test('should have a .allDrillsLog property', () => {
			expect(
				Object.hasOwn(theTraining, 'allDrillsLog'),
			).toBeTruthy();
		});

		test('should have an array for the .allDrillsLog ', () => {
			expect(Array.isArray(theTraining.allDrillsLog)).toBeTruthy();
		});

		test('should have nothing in the allDrillsLog array', () => {
			const arraySize = theTraining.allDrillsLog.length;
			expect(arraySize).toBe(0);
		});
	});

	describe('an empty training', () => {
		beforeEach(() => {
			testLocation = 'Everdeen Sport Centre';
			testDateTime = new Date(2024,2,17,13,11);
			theTraining = new Training(testDateTime, testLocation);
		});

		// test('should match expected date format', () => { // Check if formatDate is functional
		// 	const expected = 'March 17, 2024';
		// 	const actual = theTraining.formatDate();
		// 	expect(actual).toBe(expected);
		// });

		test('should have 0 log count', () => { // Check if formatDate is functional
			const expected = 0;
			const actual = theTraining.drillCount;
			expect(actual).toBe(expected);
		});

		test('should return a string saying it has 0 logged training drills', () => {
			const expected = '[March 17, 2024 - Everdeen Sport Centre]\nThere\'s 0 drill(s) recorded on this session.';
			const actual = theTraining.toString();
			expect(actual).toBe(expected);
		});
	});
	describe('a training with 1 drill in it', () => {
		beforeEach(() => {
			theTraining.addDrill(testDateTime, 33, 76, 234);
		});

		test('should have a log count of 1', () => {
			const count = theTraining.drillCount;
			expect(count).toBe(1);
		});

		test('should have 1 entry in the allDrillsLog array', () => {
			const arraySize = theTraining.allDrillsLog.length;
			expect(arraySize).toBe(1);
		});

		test('should have a drill logged in the allDrillsLog array', () => {
			const aTrainingDrill = theTraining.allDrillsLog[0];
			expect(aTrainingDrill instanceof TrainingDrill).toBeTruthy();
		});
	});

	describe('a training with 3 drills in it', () => {
		beforeEach(() => {
			theTraining.addDrill(new Date (2024,3,27,19,10), 35.722, 339.5, 4760.31); // Fail  )
			theTraining.addDrill(new Date (2024,3,27,8,30), 21.56, 236.17, 2154.4); // Pass pass pass)
			theTraining.addDrill(new Date (2024,3,27,8,30), 45.9, 593.5, 2120.2); // Fail fail pass = fail)
			theTraining.addDrill(new Date (2024,3,27,12,2), 22.112, 271.97, 2140.6); // Pass fail pass = pass)
		});

		test('should have a log count of 4', () => {
			const count = theTraining.drillCount;
			expect(count).toBe(4);
		});

		test('should have three entries in the allDrillsLog array', () => {
			const arraySize = theTraining.allDrillsLog.length;
			expect(arraySize).toBe(4);
		});
		//  TODO elaborate
		test('should have working sorter', () => {
			theTraining.sortDrills();
			const actual = theTraining.allDrillsLog[0].time;
			const expected = '08:30';
			expect(actual).toBe(expected);
		});

		test('calculation across many parts', () => {
			const actual = theTraining.calculateAvgSpeed();
			const expected = 33.03;
			expect(actual).toBe(expected);
		});
	});

	describe('a training with filters and search', () => {
		beforeEach(() => {
			let theTraining = new Training(new Date("March 17, 2024 04:30:00"))
			theTraining.addDrill(new Date("March 17, 2024 19:10:00"), 35.722, 339.5, 4760.31); // Fail
			theTraining.addDrill(new Date("March 17, 2024 08:30:00"), 21.56, 236.17, 2154.4); // Pass pass pass
			theTraining.addDrill(new Date("March 17, 2024 15:15:00"), 45.9, 593.5, 2120.2); // Fail fail pass = fail
			theTraining.addDrill(new Date("March 17, 2024 12:2:00"), 22.112, 271.97, 2140.6); // Pass fail pass = pass
		});

		test('should filter only speed above 37.16', () => { // 37.16
			const actual = theTraining.getGoalReach();;
			const expected =  {"Time: 08:30": "39.62kph", "Time: 12:02": "39.26kph"}
			expect(actual).toBe(expected);
			// expect(actual["Time: 12:02"]).toEqual("39.226kph");
			// expect(actual["Time: 8:30"]).toEqual("39.62 kph");
		});

		test('should return null if targetTime is not found', () => {
			const targetTime = '9:00';
			// const targetDateTime = new Date (2024,3,27,9,0)
			const aTrainingDrill = theTraining.findTrainingDrill(targetTime);
			const actual = aTrainingDrill;
			const expected = null;
			expect(actual).toBe(expected);
		});

		test('should find the existing drill with the specified targetTime 12:02', () => {
			const targetTime = '12:02';
			const actual = theTraining.findTrainingDrill(targetTime);
			expect(actual.swimTime).toBe(22.112);
			expect(actual.runTime).toBe(271.97);
			expect(actual.bikeTime).toBe(2140.6);
		});

		test('getting all drills successfully', () => {
			const receivedAllDrills = theTraining.getAllDrills();
			let expected = "[March 17, 2024 - Unknown]\nThere's 4 drill(s) recorded on this session."
			expected += "\n[Drill Start Time: 19:10]\nSwimming - 35.72 seconds\nRunning - 339.50 seconds\nCycling - 4760.31 seconds"
			expected += "\n[Drill Start Time: 15:15]\nSwimming - 21.56 seconds\nRunning - 236.17 seconds\nCycling - 2154.40 seconds"
			expected += "\n[Drill Start Time: 08:30]\nSwimming - 45.90 seconds\nRunning - 593.50 seconds\nCycling - 2120.20 seconds"
			expected += "\n[Drill Start Time: 12:02]\nSwimming - 22.11 seconds\nRunning - 271.97 seconds\nCycling - 2140.60 seconds"
			expect(receivedAllDrills).toBe(expected);
		});
	});

	describe('a training with shrinking ft', () => {
		beforeEach(() => {
			theTraining.addDrill('08:30', 14.32, 95.03, 34.3);
			theTraining.addDrill('19:10', 16.85, 110.2, 32.17);
			theTraining.addDrill('12:02', 22.1, 113.111, 29.3);
		});

		test('non-existent target item, unsuccessful', () => {
			const targetTime = '21:11';
			const actual = theTraining.removeDrill(targetTime);
			const expected = null;
			expect(actual).toBe(expected);
		});

		test('non-existent target item, unsuccessful, matches unchanged array length', () => {
			const targetTime = '21:11';
			theTraining.removeDrill(targetTime);
			const actual = theTraining.allDrillsLog.length;
			const expected = 3;
			expect(actual).toBe(expected);
		});

		test('successful removal of existent target item, matches items returned', () => {
			const targetTime = '19:10';
			theTraining.removeDrill(targetTime);
			const actual = theTraining.allDrillsLog.map(drill => drill.time);
			const expected = ['08:30', '12:02'];
			expect(actual).toEqual(expected);
		});

		test('successful removal of existent target item, matches array length', () => {
			const targetTime = '19:10';
			const actual = theTraining.removeDrill(targetTime).length;
			const expected = 2;
			expect(actual).toBe(expected);
		});

		test('successful removal of existent target item, matches drill count', () => {
			const targetTime = '19:10';
			theTraining.removeDrill(targetTime);
			const actual = theTraining.drillCount;
			const expected = 2;
			expect(actual).toBe(expected);
		});
	});

	describe('Updating values of a drill', () => {
		beforeEach(() => {
			const mockList = [{
				bikeTime: 0, runTime: 0, swimTime: 0, time: '19:10',
			}];
			theTraining.allDrillsLog = mockList;
		});

		test('update swimTime value', () => {
			const testTime = '19:10';
			const testKey = 'swimTime';
			const testValueReplacement = 23.356;
			const actual = theTraining.updateDrill(testTime, testKey, testValueReplacement);
			const expected = [{
				bikeTime: 0, runTime: 0, swimTime: 23.36, time: '19:10',
			}];
			expect(actual).toEqual(expected);
		});

		test('update runTime value', () => {
			const testTime = '19:10';
			const testKey = 'runTime';
			const testValueReplacement = 226.11;
			const actual = theTraining.updateDrill(testTime, testKey, testValueReplacement);
			const expected = [{
				bikeTime: 0, runTime: 226.11, swimTime: 0, time: '19:10',
			}];
			expect(actual).toEqual(expected);
		});

		test('update bikeTime value', () => {
			const testTime = '19:10';
			const testKey = 'bikeTime';
			const testValueReplacement = 2452.28;
			const actual = theTraining.updateDrill(testTime, testKey, testValueReplacement);
			const expected = [{
				bikeTime: 2452.28, runTime: 0, swimTime: 0, time: '19:10',
			}];
			expect(actual).toEqual(expected);
		});
	});
});
