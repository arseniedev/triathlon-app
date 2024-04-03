// triathlon 1.2
import Training from './training';

export default class Athelete {
    constructor(newFirstName, newLastName, newAge, newDistanceRequirement, newTargetSpeed) {
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
        let result 
        for (let aTraining of this.allTraining) {
            result += aTraining
            // for (let aDrill of aTraining.allDrillsLog) {
            //     result += aDrill
            // }
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
		this.sortTrainings();
		let foundTraining = null;
		for (const aTraining of this.allTraining) {
			if (aTraining.location === targetLocation) {
				foundTraining = aTraining;
				break;
			}
		}
		return foundTraining;
	}
}
