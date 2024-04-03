import Storage from './storage';
import TrainingDrill from './drill';

export default class Training {
	constructor(newId, newLocation = "Unknown") {
		this.id = newId;
		this.location = newLocation;
		this.targetDuration = 360; // Seconds //? constant value
		this.drillCount = 0; // ? increasing value
		this.allDrillsLog = [];
	}

	addDrill(newTimeStamp, newSwimmingDuration, newRunningDuration, newCyclingDuration) {
		const newDrill = new TrainingDrill(newTimeStamp, newSwimmingDuration, newRunningDuration, newCyclingDuration);
		this.drillCount += 1;
		this.allDrillsLog.push(newDrill);
		// Storage.saveDrillToStorage(newDrill)
	}

	toString() {
		let result;
		result = `[${this.formatDate()} - ${this.location}]\nThere's ${this.drillCount} drill(s) recorded on this session.`;
		return result;
	}

	getAllDrills() {
		let result = `${this.toString()}`
		for (let aDrill of this.allDrillsLog) {
			result += `${aDrill}`
		}
		return result
	}

	sortDrills() {
		this.allDrillsLog.sort((a, b) => {
			if (a.time < b.time) {
				return -1;
			}

			if (a.time > b.time) {
				return 1;
			}
			return 0;
		});
	}

	formatDate() {
		const d = this.date;
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const result = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
		return result;
	}

	getGoalReach() {
		this.sortDrills();
		let passedDrills
		// let passedDrills = []
		// let passedDrills = {}
		for (const aDrill of this.allDrillsLog) {
			if (aDrill.isGoalReached()) {
				passedDrills += `\n${aDrill}`
				// let aKey = aDrill.formatTime()
				// passedDrills[aKey] = aDrill.calculateSpeed() + "kph"
			}
			// passedDrills./push(aDrill) 
		}
		return passedDrills;
	}

	findTrainingDrill(targetDrillStartTime) {
		this.sortDrills();
		let foundDrill = null;
		for (const aDrill of this.allDrillsLog) {
			if (aDrill.formatTime() === targetDrillStartTime) {
				foundDrill = aDrill
				break;
			}
		}
		return foundDrill;
	}

	removeDrill(targetDrillStartTime) { // Time
		const isPresent = this.findTrainingDrill(targetDrillStartTime) !== null;
		let result = null;
		if (isPresent) {
			const index = this.allDrillsLog.indexOf(targetDrillStartTime);
			this.allDrillsLog.splice(index, 1);
			this.drillCount -= 1;
			result = this.allDrillsLog;
		}
		return result;
	}

	calculateAvgSpeed() { // Kph
		let cumulativeSpeed = 0;
		for (const aDrill of this.allDrillsLog) {
			cumulativeSpeed += aDrill.calculateSpeed();
		}
		return parseFloat((cumulativeSpeed / this.drillCount).toFixed(2));
	}

	updateDrill(startTime, keyItem, valueReplacement) {
		const aDrill = this.findTrainingDrill(startTime);
		aDrill[keyItem] = parseFloat(valueReplacement.toFixed(2));
		return this.allDrillsLog;
	}
}
