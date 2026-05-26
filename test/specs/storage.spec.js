import { Storage, STORAGE_KEYS } from '../../src/storage';
import {
	TEST_DRILL,
	TEST_NUMBERS,
	TEST_TRAINING_DATA,
} from '../constants/testConstants';

describe('Storage service', () => {
	let storage;

	beforeEach(() => {
		localStorage.clear();
		storage = new Storage();
	});

	test('saves drill data to localStorage', () => {
		storage.saveDrillToStorage(TEST_DRILL);
		expect(localStorage.length).toEqual(TEST_NUMBERS.drillStorageKeyCount);
	});

	test('loads a single drill value by key', () => {
		storage.saveDrillToStorage(TEST_DRILL);
		expect(storage.loadLocalStorage(STORAGE_KEYS.time)).toEqual(TEST_DRILL.time);
	});

	test('saves and loads training data', () => {
		storage.saveTrainingToStorage(TEST_TRAINING_DATA);
		expect(localStorage.length).toEqual(TEST_NUMBERS.trainingStorageKeyCount);
		expect(storage.loadLocalStorage(STORAGE_KEYS.location)).toEqual(TEST_TRAINING_DATA.location);
	});
});
