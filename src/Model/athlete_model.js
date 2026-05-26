export default class AthleteModel {
	constructor(
		newId,
		newfirstName,
		newlastName,
		newSwimmingDuration = 0.0,
		newRunningDuration = 0.0,
		newCyclingDuration = 0.0,
		// theTriathlon,
	) {
		this.id = newId
		this.firstName = newfirstName
		this.lastName = newlastName
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
		this.speed = 0.0
		// this.myTriathlon = theTriathlon
	}

	// toString() {
	// 	let result = `[Athlete No.${this.id}] ${this.firstName} ${this.lastName}\n`
	// 	result += `Swimming - ${this.swimTime} hours\n`
	// 	result += `Running - ${this.runTime} hours\n`
	// 	result += `Cycling - ${this.bikeTime} hours`
	// 	return result
	// }

	calculateTotalDuration() {
		const durationHr = (this.swimTime + this.runTime + this.bikeTime)
		return durationHr
	}

	calculateSpeedKph() {
		// const distanceKm = this.myTriathlon.calculateTotalDistance()
		const durationHr = this.calculateTotalDuration()
		this.speed = parseFloat((distanceKm / durationHr).toFixed(2))
		return this.speed
	}

	cacheOldValue() {
		const oldVal = {}
		oldVal.firstName = this.firstName
		oldVal.lastName = this.lastName
		return oldVal
	}

	editAthleteData(targetField, newValue, decision = false) {
		const edittedData = {}
		const fieldOptions = ['firstName', 'lastName']

		if (typeof targetField !== 'string') {
			throw new Error('Field must be a string')
		}

		// Field is not in the list of options
		if (!fieldOptions.includes(targetField)) {
			throw new Error('Invalid field to update')
		}

		// No errors found
		edittedData[targetField] = newValue
		this.manageChanges(decision, edittedData)
	}

	manageChanges(decision, cachedChanges) {
		// Save changes
		if (decision) {
			for (const [key, value] of Object.entries(cachedChanges)) {
				this[key] = value
			}

			console.log('Changes saved!')
		} else {
		// Discard changes
			this.cacheOldValue()
			console.log('Changes discarded!')
		}
	}
}
