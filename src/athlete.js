<<<<<<< HEAD
import Training from './training';

export default class Athelete {
    constructor(newFirstName, newLastName, newAge, newDistanceRequirement, newTargetSpeed) {
		this.firstName = newFirstName
		this.lastName = newLastName
		// keep backward compatibility with existing callers/tests
		this.firstname = newFirstName
		this.lastname = newLastName
		this.age = newAge
		this.distance = newDistanceRequirement //km
        this.speed = newTargetSpeed //kph
        this.trainCount = 0
        this.allTraining = []
    }

    addTraining(newDate, newLocation) {
        const newTraining = new Training(newDate, newLocation)
        this.trainCount += 1
        this.allTraining.push(newTraining)
    }

    getAllDrills() {
        let result = ''
        for (let aTraining of this.allTraining) {
            result += aTraining
        }
        return result
    }

	sortTrainByAvgSpeed() {
	    this.allTraining.sort((a, b) => {
			if (a.calculateAvgSpeed() < b.calculateAvgSpeed()) {
				return -1;
			}

			if (a.calculateAvgSpeed() > b.calculateAvgSpeed()) {
				return 1;
			}
			return 0;
		});
	}

    filterTrainingByPlace(targetLocation) {
		this.sortTrainByAvgSpeed();
		let foundTraining = null;
		for (const aTraining of this.allTraining) {
			if (aTraining.location === targetLocation) {
				foundTraining = aTraining;
				break;
			}
		}
		return foundTraining;
	}
=======
import { TrainingSession } from './training_session.js'

export class Athlete {
	constructor(newId, newFirstName, newLastName, newAge, newSwimmingDuration = 0.0, newRunningDuration = 0.0, newCyclingDuration = 0.0, theTriathlon) {
		this.id = newId
		this.firstname = newFirstName
		this.lastname = newLastName
        this.age = newAge
		this.swimTime = newSwimmingDuration
		this.runTime = newRunningDuration
		this.bikeTime = newCyclingDuration
		this.speed = 0.0         
		this.myTriathlon = theTriathlon
		this.selectSaveChanges = false
		this.allTrainingSessions = []
	}

    displayDetails() {
        let result = `[Athlete No.${this.id}] ${this.firstname} ${this.lastname} \n`
        result += `Age: ${this.age} Speed: ${this.calculateSpeedKph()} kph \n`
		result += `Swimming - ${this.swimTime.toFixed(2)} minutes \n`
		result += `Running - ${this.runTime.toFixed(2)} minutes \n`
		result += `Cycling - ${this.bikeTime.toFixed(2)} minutes \n`
        return result
	}

	addTrainingSession(trainingDate, startTime, finisherTime, location) {
		const NEW_SESSION = new TrainingSession(trainingDate, startTime, finisherTime, location)
		this.allTrainingSessions.push(NEW_SESSION)
	}

	getSportComponent(component) {
		const componentDict = {
			swimming: this.swimTime,
			running: this.runTime,
			cycling: this.bikeTime
		}
		return componentDict
	}

	// Converting duration seconds into hours
	calculateTotalDuration() {
		const durationHr = (this.swimTime + this.runTime + this.bikeTime)
		return durationHr
	}

	// Calculate speed to kph
	calculateSpeedKph() {
		const distanceKm = 93.5
		const durationHr = this.calculateTotalDuration()
		this.speed =  parseFloat((distanceKm / durationHr).toFixed(2))
		return this.speed
	}

	editAthleteData(targetFieldToUpdate, newValue) {
		let edittedData = {}
		const fieldOptions = ['firstname','lastname','age']

		if (typeof targetFieldToUpdate !== 'string') {
			throw new Error('Field must be a string')
		}

		if (typeof newValue !== 'string' && targetFieldToUpdate !== 'age') {
			throw new Error('New value must be a string')
		}

		// Field is not in the list of options
		if(!fieldOptions.includes(targetFieldToUpdate)) {
			throw new Error('Invalid field to update')
		}

		// No errors found
		edittedData[targetFieldToUpdate] = newValue
		return edittedData
    }

    saveChanges(decision, targetFieldToUpdate, newValue) {
		let result
        if (decision) {
            const edittedData = this.editAthleteData(targetFieldToUpdate, newValue)
            for (const [key,value] of Object.entries(edittedData)) {
                this[key] = value
            }
            this.selectSaveChanges = true
			result = this
        } else {
            result = this.revertChanges()
        }
		return result
    }

    revertChanges() {
        this.firstname = this.firstname
        this.lastname = this.lastname
        this.age = this.age

		return this
    }
>>>>>>> current
}
