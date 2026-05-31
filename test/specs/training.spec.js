import Training from '../../src/training';
import { TEST_TEXT } from '../constants/testConstants';

describe('Training model', () => {
	let training;

	beforeEach(() => {
		localStorage.clear();
		training = new Training(TEST_TEXT.trainingId, TEST_TEXT.trainingLocation, new Date());
	});

	test('saves a drill payload by training id', () => {
		const drill = { time: '09:45', swimTime: 21.3, runTime: 189.54, bikeTime: 2323.09 };
		training.saveToStorage(drill);
		expect(localStorage.length).toEqual(1);
		expect(training.loadLocalStorage()).toEqual(drill);
	});

	test('adds and finds drills', () => {
		training.addDrill(new Date(2024, 4, 1, 9, 45), 21.3, 189.54, 2323.09);
		const found = training.findTrainingDrill('09:45');
		expect(found).not.toBeNull();
		expect(training.drillCount).toEqual(1);
	});
});
