import AthleteModel from './athlete_model.js'

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
		// this.category = ["Swim", "Bike", "Run"]
	}

	addAthlete(data) {
		let newId = data.athleteID 
		let newFirstName = data.firstname 
		let newLastName = data.lastname
		let newSwim = data.swimTime
		let newRun = data.runTime
		let newBike = data.bikeTime
		let newAthlete = new AthleteModel(newId, newFirstName, newLastName, newSwim, newRun, newBike, this)
		this.athleteCount += 1
		this.allMyAthletes.push(newAthlete)
	}

	// processTimeCache(time, data) {
	// 	time.forEach((item) => {
	// 		let time = item.time
	// 		let category = item.category
	// 		data.append(category, time)
	// 	})
	// 	// return (time, category)
	// }

	handleForm(form,timers) {
		console.log(timers)
		const data = new FormData(form)
		const store = timers
		store.forEach((item) => {
			let time = item.time
			let category = item.category
			data.append(category, time)
		})

		// this.processTimeCache(store, data)
		let result = this.compile(data)
		return result
	}

	compile(data) {
		let newAthleteData = {}
		data.forEach((value, headers) => {
		  // if(value !== undefined)  {
			newAthleteData[headers] = value
		})
		// this.addAthlete(newAthleteData)
		// let key = newAthleteData.athleteID

		this.saveToLocalStorage(newAthleteData)
		this.addAthlete(newAthleteData)
		return newAthleteData
	}

	
	saveToLocalStorage(data) {
        let key = window.localStorage.length
        localStorage.setItem(key, JSON.stringify(data))
		// this.allMyAthletes.push(data)
    }

    loadFromLocalStorage() {
        let allMyAthletes = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)))
		// console.log(allMyAthletes)
        return allMyAthletes
    }
	

	// loadFromLocalStorage() {
	// 	const allItems = []
	// 	for (let index = 0 ; index < localStorage.length ; index++) {
	// 		const key = localStorage.key(index)
	// 		const data = window.localStorage.getItem(key)
	// 		const serializedValue = JSON.parse(data)
	// 		allItems.push(serializedValue)
	// 	}
	// 	return allItems
	// }

	sortAllAthletes(arrayToSort,sorter) { //allMyAthletes.sort((a, b) => {})
        return arrayToSort.sort((a, b) => {
            if (sorter.direction === 'asc') {
                return a[sorter.keyToSort] >  b[sorter.keyToSort] ? 1 : -1
            } else{
                return a[sorter.keyToSort] >  b[sorter.keyToSort] ? -1 : 1
            }
        })
    }

	formatDate() {
		const d = this.date
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
		]
		this.date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
		return this.date
	}

	findAthlete(targetId) {
		let foundAthlete = null
		this.allMyAthletes.forEach((athlete) => {
            if(athlete.id.toLowerCase() === targetId.toLowerCase()){
                foundAthlete = athlete
            }
        })
		return foundAthlete
	}

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

	isAboveAvg(targetId) {
		const targetAthlete = this.findAthlete(targetId)
		const targetAthleteSpeed = targetAthlete.calculateSpeedKph()
		const speedThreshold = this.calculateAvgSpeed()
		console.log(targetAthleteSpeed)
		return targetAthleteSpeed > speedThreshold
	}

	getAboveAvg() {
		const aboveAvgParticipants = []
		for (const anAthlete of this.allMyAthletes) {
			if (this.isAboveAvg(anAthlete.id)) {
				aboveAvgParticipants.push(anAthlete)
			}
		}
		return aboveAvgParticipants
	}

	removeAthlete(targetId) {
		const targetItem = this.findAthlete(targetId)
		const isPresent = targetItem !== null
		if (isPresent) {
			const index = this.allMyAthletes.indexOf(targetItem)
			this.allMyAthletes.splice(index, 1)
			this.athleteCount -= 1
		} else {
			throw new Error(`Athlete with id ${targetId} is not found`)
		}
	}

}
