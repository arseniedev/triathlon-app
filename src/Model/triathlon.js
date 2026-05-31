import Athlete from './athlete.js'

export default class Triathlon {
	constructor(
		db,
		newEventDate = new Date(),
		newLocation = 'Unknown',
		newDistance = {swim:3.5, run:10.0, bike:80.0,},
	) {
		this.db = db
		this.allMyAthletes = []
		this.date = newEventDate
		this.location = newLocation
		this.distance = newDistance
		this.athleteCount = 0
	}

	addAthlete(data) {
		let newId = data.id
		// console.log(newId)
		let newFirstName = data.firstname 
		let newLastName = data.lastname
		let newSwim = data.Swim
		let newRun = data.Run
		let newBike = data.Bike
		let newAthlete = new Athlete(newId, newFirstName, newLastName, newSwim, newRun, newBike)
		// this.athleteCount += 1
		this.allMyAthletes.push(newAthlete)
		console.log(this.allMyAthletes)
	}

	handleForm(form,timers) {
		// console.log(timers)
		const data = new FormData(form)
		const store = timers
		store.forEach((item) => {
			let time = item.time
			let category = item.category
			data.append(category, time)
		})

		// this.processTimeCache(store, data)
		let result = this.compile(data)
		// console.log(result)
		return result
	}

	compile(data) {
		let newAthleteData = {}
		data.forEach((value, headers) => {
			newAthleteData[headers] = value
		})
		return newAthleteData
	}

	deleteAthlete(targetId) {
		// if (tag ==='delete') {
		localStorage.removeItem(targetId)
		// }
		return this.loadFromLocalStorage()
	}

	generateKey() {
		return Math.random().toString(36).substring(2,4).toUpperCase()
	}

	saveToLocalStorage(data) {
		// this.athleteCount += 1
        // let key = this.generateKey()
        let key = data.id
		// console.log(data.id)
        localStorage.setItem(key, JSON.stringify(data))
    }
	
    loadFromLocalStorage() {
		let allMyAthletes = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)))
		// console.log(allMyAthletes)

        return allMyAthletes
    }
	
	//* FINDING BY ID
	findAthlete(query) {
		let foundAthlete = null
		let storedData = this.loadFromLocalStorage()
		for (const entryIndex in {...storedData}) {
			let entry = storedData[entryIndex]
				if (entry['id'] === query) {
					foundAthlete = entry
					// console.log(foundAthlete)
				}
			}
		return foundAthlete
	}

	//* FINDING ALL
	// findAthlete(value) {
	// 	let query = value
	// 	let foundAthlete = null
	// 	let storedData = this.loadFromLocalStorage()
	// 	for (const entryIndex in {...storedData}) {
	// 		let val = storedData[entryIndex]
	// 		for (const vall in val) {
	// 			if (val[vall] === query) {
	// 				foundAthlete = val
	// 			}
	// 		}
	// 	}
	// 	return foundAthlete
	// }

	calculateTotalDistance() {
		return this.swimDistance + this.runDistance + this.bikeDistance
	}

	calculateAvgSpeed() {
		let cumulativeSpeed = 0
		for (const anAthlete of this.allMyAthletes) {
			cumulativeSpeed += anAthlete.calculateSpeedKph()
		}

		const result = parseFloat((cumulativeSpeed / this.athleteCount).toFixed(2))
		return result
	}

	// removeAthlete(targetId) {
	// 	const targetItem = this.findAthlete(targetId)
	// 	const isPresent = targetItem !== null
	// 	if (isPresent) {
	// 		const index = this.allMyAthletes.indexOf(targetItem)
	// 		this.allMyAthletes.splice(index, 1)
	// 		// this.athleteCount -= 1
	// 	} else {
	// 		throw new Error(`Athlete with id ${targetId} is not found`)
	// 	}
	// }

}
