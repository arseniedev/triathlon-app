/* eslint-env es6 */
/* eslint quotes: ["error", "single"] */
/* eslint semi: ["error", "never"] */
/* globals */

export default class TrainingDrill {
	// Supersprint
	// ? to def or not
	// duration = 0.0
	// distanceKm = 26.55 //km
	// targetSpeed = 37.16 //kph
	// YYYY - M+1 - D1
	constructor(newTimeStamp, newSwimmingDuration = 0.0, newRunningDuration = 0.0, newCyclingDuration = 0.0) {
		this.dateTime = newTimeStamp
		this.date = newTimeStamp
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
	}

	toString() {
		this.formatDate()
		this.formatTime()
		let result
		result = `[Date: ${this.date} Drill Start Time: ${this.time}]\n`
		result += `Swimming - ${this.swimTime.toFixed(2)} seconds\n`
		result += `Running - ${this.runTime.toFixed(2)} seconds\n`
		result += `Cycling - ${this.bikeTime.toFixed(2)} seconds`
		return result
	}

	// Converting duration seconds into hours
	calculateTotalDuration() {
		const durationHr = (this.swimTime + this.runTime + this.bikeTime) / 3600
		return durationHr
	}

	// Calculate speed to kph
	calculateSpeed() {
		const distanceKm = 26.55
		const durationHr = this.calculateTotalDuration()
		return parseFloat((distanceKm / durationHr).toFixed(2))
	}

	isGoalReached() {
		const targetSpeed = 37.16
		return this.calculateSpeed() >= targetSpeed
	}

	formatTime() {
		let time = this.time
		if (time !== undefined){
			let hours = time.getHours().toString().padStart(2, '0')
			let minutes = time.getMinutes().toString().padStart(2, '0')
			this.time = `${hours}:${minutes}`
		}
		return this.time
		// let dateTime = this.time
	}

	formatDate() {
		let date = this.date
		if (date !== undefined){
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
		this.date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
		}
		return this.date
	}
}
