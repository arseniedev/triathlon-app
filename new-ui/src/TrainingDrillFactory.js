import { TrainingDrill } from './drill.js';

export class TrainingDrillFactory {
	static createDrill(dateTime = new Date(2024, 3, 5, 0, 0), swimTime = 0.0, runTime = 0.0, bikeTime = 0.0) {
		return new TrainingDrill(dateTime, swimTime, runTime, bikeTime);
	}

	static createDrillFromData(data) {
		if (!data.dateTime && !data.time) {
			throw new Error('DrillFactory: dateTime or time is required');
		}

		const dateTime = data.dateTime || new Date();
		const swimTime = data.swimTime || 0.0;
		const runTime = data.runTime || 0.0;
		const bikeTime = data.bikeTime || 0.0;

		return new TrainingDrill(dateTime, swimTime, runTime, bikeTime);
	}
}
