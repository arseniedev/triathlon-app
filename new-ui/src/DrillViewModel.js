import { TrainingDrill } from './drill.js';
import { TrainingDrillFactory } from './TrainingDrillFactory.js';
import { StorageManager } from './StorageManager.js';

export class DrillViewModel {
	constructor() {
		this.drill = null;
		this.storageManager = StorageManager.getInstance('localStorage');
		this.observers = [];
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

	createDrill(dateTime = new Date(2024, 3, 5, 0, 0), swimTime = 0.0, runTime = 0.0, bikeTime = 0.0) {
		this.drill = TrainingDrillFactory.createDrill(dateTime, swimTime, runTime, bikeTime);
		this.notify();
		return this.drill;
	}

	createDrillFromData(data) {
		this.drill = TrainingDrillFactory.createDrillFromData(data);
		this.notify();
		return this.drill;
	}

	getDrillInfo() {
		if (!this.drill) return null;

		return {
			dateTime: this.drill.dateTimeId,
			date: this.drill.date,
			time: this.drill.time,
			swimTime: this.drill.swimTime,
			runTime: this.drill.runTime,
			bikeTime: this.drill.bikeTime,
			totalDuration: this.drill.calculateTotalDuration(),
			speed: this.drill.calculateSpeed(),
			toString: this.drill.toString()
		};
	}

	calculateTotalDuration() {
		return this.drill ? this.drill.calculateTotalDuration() : 0;
	}

	calculateSpeed(distanceKm = 26.55) {
		return this.drill ? this.drill.calculateSpeed(distanceKm) : 0;
	}

	isGoalReached(distanceKm = 26.55, targetSpeed = 37.16) {
		return this.drill ? this.drill.isGoalReached(distanceKm, targetSpeed) : false;
	}

	formatDateTime() {
		return this.drill ? this.drill.formatDateTime() : null;
	}

	saveDrillToStorage() {
		if (this.drill) {
			this.storageManager.saveDrillToStorage({
				time: this.drill.time,
				swimTime: this.drill.swimTime,
				runTime: this.drill.runTime,
				bikeTime: this.drill.bikeTime
			});
		}
	}

	getState() {
		return {
			drill: this.getDrillInfo(),
			totalDuration: this.calculateTotalDuration(),
			speed: this.calculateSpeed()
		};
	}
}
