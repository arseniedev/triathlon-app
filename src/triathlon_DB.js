import Athlete from './athlete'
import IndexedDbService from './services/indexedDbService'

export default class Triathlon {
	databaseName = "TriathlonDataBase"
	objectStoreName = "TriathlonAthletes"
	indexedDB = window.indexedDB
	constructor(
		newEventDate = new Date(),
		newLocation = "Unknown",
		newSwimDistance = 3.5,
		newRunDistance = 10.0,
		newBikeDistance = 80.0
	){
		this.date = newEventDate
		this.location = newLocation
		this.swimDistance = newSwimDistance
		this.runDistance = newRunDistance
		this.bikeDistance = newBikeDistance
		this.allParticipants = []
		this.participantCount = 0
		this.indexedDbService = new IndexedDbService()
	}

    addAthlete(newId, newFirstName, newLastName, newAge, newSwimDuration, newRunDuration, newBikeDuration) {
        const newAthlete = new Athlete(newId, newFirstName, newLastName, newAge, newSwimDuration, newRunDuration, newBikeDuration, this)
        this.participantCount += 1
        this.allParticipants.push(newAthlete)
		// this.saveAllToStorage("01", newAthlete)
    }

	toString() {
		let result
		result = `[${this.formatDate()}] - ${this.location}]\nThere's ${this.participantCount} participant(s) competed on this event.`
		return result
	}

	sortParticipants() {
		this.allParticipants.sort((a, b) => {
			if (a.id < b.id) {
				return -1
			}

			if (a.id > b.id) {
				return 1
			}
			// a must be equal to b
			else {
				console.log("Warning: Non-unique IDs detected!")
				return 0
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
		const result = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
		return result
	}

	findAthlete(targetId) {
		this.sortParticipants()
		let foundAthlete = null
		for (const anAthlete of this.allParticipants) {
			if (anAthlete.id === targetId) {
				foundAthlete = anAthlete
				break
			}
		}
		return foundAthlete
	}

	calculateTotalDistance() {
		return this.swimDistance + this.runDistance + this.bikeDistance
	}

	getAll() {
        this.sortParticipants()
		let result = `${this.toString()}`
		for (let anAthlete of this.allParticipants) {
			result += `${anAthlete}`
		}
		return result
	}	

	calculateAvgSpeed() {
		let cumulativeSpeed = 0
		for (const anAthlete of this.allParticipants) {
			cumulativeSpeed += anAthlete.calculateSpeedKph()
		}
		let result = parseFloat((cumulativeSpeed / this.participantCount).toFixed(2))
		return result
	}

	isAboveAvg(targetId) {
		this.sortParticipants()
		let targetAthlete = this.findAthlete(targetId)
		const speedThreshold = this.calculateAvgSpeed()
		return targetAthlete.calculateSpeedKph() >= speedThreshold
	}

	getAboveAvg() {
        this.sortParticipants()
		let aboveAvgParticipants = []
		for (const anAthlete of this.allParticipants) {
			if (this.isAboveAvg(anAthlete.id)) {
				aboveAvgParticipants.push(`${anAthlete.id} - ${anAthlete.firstName}: ${anAthlete.calculateSpeedKph()} kph\n`)
			}
		}
		let result = `AvgSpeed: ${this.calculateAvgSpeed()}\n${aboveAvgParticipants}`
		return result
	}

	removeAthlete(targetId) {
		this.sortParticipants()
		let targetItem = this.findAthlete(targetId) 
		const isPresent = targetItem !== null
		if (isPresent) {
				const index = this.allParticipants.indexOf(targetItem)
				this.allParticipants.splice(index, 1)
				this.participantCount -= 1
		} else {
			throw new Error(`Athlete with id ${targetId} is not found`)
		}
	}

	saveAllToStorage(key, athlete) {
		window.localStorage.setItem(key, JSON.stringify(athlete))
		return localStorage
	}

	loadAllLocalStorage() {
		let allItems = {}
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			const data = window.localStorage.getItem(key)
			const serialized_value = JSON.parse(data)
			allItems[key] = serialized_value
		}
		return allItems
	}

	async manageDatabase(databaseName = "DefaultDB", objectStoreName = "DefaultStore", version = 1) {
		this.db = await this.indexedDbService.open(databaseName, objectStoreName, version)
		return this.db
	}

	closeDB() {
		this.indexedDbService.close()
		this.db = null
	}

	deleteDatabase(targetDatabase) {
		this.indexedDbService.deleteDatabase(targetDatabase)
		this.db = null
	}

}
