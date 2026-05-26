import Athlete from '../../src/athlete';

describe('Athlete model', () => {
	test('keeps naming compatibility and can add training', () => {
		const athlete = new Athlete('Celia', 'St. James', 32, 26.55, 39);
		athlete.addTraining(new Date('2024-02-03'), 'Place 1');
		expect(athlete.firstName).toEqual('Celia');
		expect(athlete.firstname).toEqual('Celia');
		expect(athlete.trainCount).toEqual(1);
	});
});
