import Training from '../training';

export default class TrainingViewModel {
	constructor(training = null) {
		this.training = training;
	}

	createTraining(id, location, date = new Date()) {
		this.training = new Training(id, location, date);
		return this.training;
	}

	addDrill(dateTime, swimTime, runTime, bikeTime) {
		if (!this.training) {
			throw new Error('Training is not initialized');
		}
		this.training.addDrill(dateTime, swimTime, runTime, bikeTime);
		return this.training.allDrillsLog;
	}
}
