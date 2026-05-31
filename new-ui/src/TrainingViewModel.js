import { Training } from './training.js';
import { StorageManager } from './StorageManager.js';

export class TrainingViewModel {
	constructor(date = new Date(), location = 'Unknown', kmDistanceRequirement = 26.55, targetSpeed = 37.16) {
		this.training = new Training(date, location, kmDistanceRequirement, targetSpeed);
		this.storageManager = StorageManager.getInstance('localStorage');
		this.observers = [];
		this.currentTrainingIndex = 0;
		this.trainingSessions = [];
	}

	subscribe(observer) {
		this.observers.push(observer);
	}

	unsubscribe(observer) {
		this.observers = this.observers.filter(obs => obs !== observer);
	}

	notify() {
		this.observers.forEach(observer => observer(this.getState()));
	}

	addDrill(dateTime, swimDuration, runDuration, bikeDuration) {
		this.training.addDrill(dateTime, swimDuration, runDuration, bikeDuration);
		this.notify();
	}

	removeDrill(targetDrillStartTime) {
		this.training.removeDrill(targetDrillStartTime);
		this.notify();
	}

	updateDrill(startTime, keyItem, valueReplacement) {
		this.training.updateDrill(startTime, keyItem, valueReplacement);
		this.notify();
	}

	getTrainingInfo() {
		return {
			date: this.training.formatDate(),
			location: this.training.location,
			drillCount: this.training.drillCount,
			distance: this.training.distance,
			targetSpeed: this.training.speed,
			avgSpeed: this.training.calculateAvgSpeed(),
			isGoalReached: this.training.drillCount > 0 ? this.training.isGoalReached() : false
		};
	}

	getDrills() {
		return this.training.allDrillsLog;
	}

	getGoalReachedDrills() {
		return this.training.getGoalReach();
	}

	getAllDrillsFormatted() {
		return this.training.getAllDrills();
	}

	findDrill(targetTime) {
		return this.training.findTrainingDrill(targetTime);
	}

	sortDrills() {
		this.training.sortDrills();
		this.notify();
	}

	saveTrainingToStorage() {
		this.storageManager.saveTrainingToStorage({
			date: this.training.formatDate(),
			location: this.training.location
		});
	}

	getState() {
		return {
			trainingInfo: this.getTrainingInfo(),
			drills: this.getDrills(),
			goalReachedDrills: this.getGoalReachedDrills()
		};
	}
}
