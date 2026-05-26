const SECONDS_PER_HOUR = 3600;
const DEFAULT_DATE_TIME = new Date(2024, 3, 5, 0, 0);

export class TrainingDrill {
	constructor(
		newDateTime = DEFAULT_DATE_TIME,
		newSwimmingDuration = 0,
		newRunningDuration = 0,
		newCyclingDuration = 0,
	) {
		this.dateTimeId = newDateTime ?? DEFAULT_DATE_TIME;
		this.date = undefined;
		this.time = undefined;
		this.swimTime = newSwimmingDuration ?? 0;
		this.runTime = newRunningDuration ?? 0;
		this.bikeTime = newCyclingDuration ?? 0;
	}

	toString() {
		this.formatDateTime();
		return `\n[Date: ${this.date} Drill Start Time: ${this.time}]\n`
			+ `Swimming - ${this.swimTime.toFixed(2)} seconds\n`
			+ `Running - ${this.runTime.toFixed(2)} seconds\n`
			+ `Cycling - ${this.bikeTime.toFixed(2)} seconds`;
	}

	formatDateTime() {
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December',
		];
		const dateTime = this.dateTimeId;
		const hours = dateTime.getHours().toString().padStart(2, '0');
		const minutes = dateTime.getMinutes().toString().padStart(2, '0');
		this.date = `${months[dateTime.getMonth()]} ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
		this.time = `${hours}:${minutes}`;
		return { date: this.date, time: this.time };
	}

	calculateTotalDuration() {
		return (this.swimTime + this.runTime + this.bikeTime) / SECONDS_PER_HOUR;
	}

	calculateSpeed(distanceKm) {
		const durationHr = this.calculateTotalDuration();
		if (durationHr <= 0) {
			return 0;
		}
		return parseFloat((distanceKm / durationHr).toFixed(2));
	}

	isGoalReached(distanceKm, targetSpeed) {
		if (typeof distanceKm !== 'number' || typeof targetSpeed !== 'number') {
			return false;
		}
		return this.calculateSpeed(distanceKm) >= targetSpeed;
	}
}

export default TrainingDrill;
