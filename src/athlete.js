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
}
