/* triathlon 1.0 */
/* no date formatting method */

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
	constructor(newTimeStamp = '00:00', newSwimmingDuration = 0.0, newRunningDuration = 0.0, newCyclingDuration = 0.0) {
		this.time = newTimeStamp
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
	}

	toString() {
		let result
		result = `\n[Drill Start Time: ${this.time}]\n`
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
}
