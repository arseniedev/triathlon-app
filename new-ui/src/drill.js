export class TrainingDrill {
	// Supersprint
	// ? to def or not
	// duration = 0.0
	// distanceKm = 26.55 //km
	// targetSpeed = 37.16 //kph
	// YYYY - M+1 - D1
	constructor(newDateTime = new Date(2024,3,5,0,0), newSwimmingDuration = 0.0, newRunningDuration = 0.0, newCyclingDuration = 0.0) {
		// Handle string time input
		if (typeof newDateTime === 'string') {
			const [hours, minutes] = newDateTime.split(':');
			this.dateTimeId = new Date(2024, 3, 5, parseInt(hours), parseInt(minutes));
		} else {
			this.dateTimeId = newDateTime;
		}
		this.date = undefined
		this.time = undefined
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
	}
	
	toString() {
		this.formatDateTime()
		let result
		result = `\n[Drill Start Time: ${this.time}]\n`
		result += `Swimming - ${this.swimTime.toFixed(2)} seconds\n`
		result += `Running - ${this.runTime.toFixed(2)} seconds\n`
		result += `Cycling - ${this.bikeTime.toFixed(2)} seconds`
		return result
	}

	formatDateTime() {
		let dateTimedict = {} 
		const dateTime = this.dateTimeId
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
		let hours = dateTime.getHours().toString().padStart(2, '0')
		let minutes = dateTime.getMinutes().toString().padStart(2, '0')
		
		this.date = `${months[dateTime.getMonth()]} ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
		this.time = `${hours}:${minutes}`

		dateTimedict['date'] = this.date
		dateTimedict['time'] = this.time

		return dateTimedict
	}

	// Converting duration seconds into hours
	calculateTotalDuration() {
		const durationHr = (this.swimTime + this.runTime + this.bikeTime) / 3600
		return durationHr
	}

	// Calculate speed to kph
	calculateSpeed(distanceKm = 26.55) {
		const durationHr = this.calculateTotalDuration()
		if (durationHr === 0) return 0;
		return parseFloat((distanceKm / durationHr).toFixed(2))
	}

	isGoalReached(distanceKm = 26.55, targetSpeed = 37.16) {
		return this.calculateSpeed(distanceKm) >= targetSpeed
	}
}
