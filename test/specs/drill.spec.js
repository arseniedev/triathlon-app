import { TrainingDrill } from '../../src/drill';
import { TEST_NUMBERS } from '../constants/testConstants';

describe('TrainingDrill model', () => {
	test('uses default date and zero durations', () => {
		const drill = new TrainingDrill();
		const dateTime = drill.formatDateTime();
		expect(dateTime.date).toEqual('April 5, 2024');
		expect(dateTime.time).toEqual('00:00');
		expect(drill.calculateTotalDuration()).toEqual(0);
	});

	test('calculates duration in hours', () => {
		const drill = new TrainingDrill(
			new Date(2024, 3, 12, 13, 11),
			60,
			120,
			180,
		);
		expect(drill.calculateTotalDuration()).toEqual((60 + 120 + 180) / TEST_NUMBERS.secondsPerHour);
	});

	test('returns false for missing goal parameters', () => {
		const drill = new TrainingDrill();
		expect(drill.isGoalReached()).toEqual(false);
	});
});
