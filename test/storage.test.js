/* eslint linebreak-style: ["error", "unix"] */
// import {beforeEach, expect} from '@jest/globals';
import { Storage } from '../src/storage.js';

describe('localStorage with Jest', () => {
	describe('it can save and retrieve drill data', () => {
		let storage;
		let mockDrillData;
		beforeEach(() => {
			storage = new Storage();
			mockDrillData = {
				time: '12:34', swimTime: 24, runTime: 371, bikeTime: 2445,
			};
		});

		test('drill storage size will be 4', () => {
			localStorage.clear();
			storage.saveDrillToStorage(mockDrillData);
			expect(localStorage.length).toEqual(4); // Length
		});

		test('should load the saved drill time data from localStorage', () => {
			const mockDrillKey = 'time';
			expect(storage.loadLocalStorage(mockDrillKey)).toEqual('12:34');
		});

		test('should load the saved drill swimTime data from localStorage', () => {
			const mockDrillKey = 'swimTime';
			expect(storage.loadLocalStorage(mockDrillKey)).toEqual(24);
		});
		test('should load the saved drill runTime data from localStorage', () => {
			const mockDrillKey = 'runTime';
			expect(storage.loadLocalStorage(mockDrillKey)).toEqual(371);
		});

		test('should load the saved drill bikeTime data from localStorage', () => {
			const mockDrillKey = 'bikeTime';
			expect(storage.loadLocalStorage(mockDrillKey)).toEqual(2445);
		});

		test('load all drill data from localStorage', () => {
			const expected = {
				bikeTime: 2445, runTime: 371, swimTime: 24, time: '12:34',
			};
			expect(storage.loadAllLocalStorage()).toEqual(expected);
		});
	});

	describe('it can save training data', () => {
		let storage;
		let mockTrainingData;
		beforeEach(() => {
			storage = new Storage();
			// TODO fix data type into date
			mockTrainingData = {date: 'March 13, 2024', location: 'Evelyn Hugo Sports Centre'};
		});

		test('training storage size will be 2', () => {
			localStorage.clear();
			storage.saveTrainingToStorage(mockTrainingData);
			expect(localStorage.length).toEqual(2);
		});

		test('should load the correct training date from localStorage', () => {
			const mockTrainingKey = 'date';
			expect(storage.loadLocalStorage(mockTrainingKey)).toEqual('March 13, 2024');
		});

		test('should load the correct training location from localStorage', () => {
			const mockTrainingKey = 'location';
			expect(storage.loadLocalStorage(mockTrainingKey)).toEqual('Evelyn Hugo Sports Centre');
		});

		test('load all training data from localStorage', () => {
			const expected = {date: 'March 13, 2024', location: 'Evelyn Hugo Sports Centre'};
			expect(storage.loadAllLocalStorage()).toEqual(expected);
		});
	});
});
