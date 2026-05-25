import Athlete from './athlete'

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
		const indexedDB =
		window.indexedDB

		if (!indexedDB) {
		console.log("IndexedDB could not be found in this browser.")
		}

		// 2
		const request = indexedDB.open(databaseName, version)

		request.onerror = function (event) {
		console.error("An error occurred with IndexedDB")
		console.error(event)
		}

		request.onupgradeneeded = function () {
		//1
		const db = request.result

		//2
		const store = db.createObjectStore(objectStoreName, { keyPath: "id" })

		//3
		store.createIndex("cars_colour", ["colour"], { unique: false })

		// 4
		store.createIndex("colour_and_make", ["colour", "make"], {
			unique: false,
		}) 
		}

		request.onsuccess = function () {
		console.log("Database opened successfully")

		const db = request.result

		// 1
		const transaction = db.transaction(objectStoreName, "readwrite")

		//2
		const store = transaction.objectStore(objectStoreName)
		const colourIndex = store.index("cars_colour")
		const makeModelIndex = store.index("colour_and_make")

		//3
		store.put({ id: 1, colour: "Red", make: "Toyota" })
		store.put({ id: 2, colour: "Red", make: "Kia" })
		store.put({ id: 3, colour: "Blue", make: "Honda" })
		store.put({ id: 4, colour: "Silver", make: "Subaru" })

		//4
		const idQuery = store.get(4)
		const colourQuery = colourIndex.getAll(["Red"])
		const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"])

		// 5
		idQuery.onsuccess = function () {
			console.log('idQuery', idQuery.result)
		}
		colourQuery.onsuccess = function () {
			console.log('colourQuery', colourQuery.result)
		}
		colourMakeQuery.onsuccess = function () {
			console.log('colourMakeQuery', colourMakeQuery.result)
		}

		// 6
		transaction.oncomplete = function () {
			db.close()
		}
		}
	}

	closeDB() {
		if (this.db) {
		  this.db.close()
		  this.db = null
		}
	  }

	deleteDatabase(targetDatabase) {
		this.closeDB()
		const indexedDB = window.indexedDB
		const deleteRequest = indexedDB.deleteDatabase(targetDatabase)
		deleteRequest.onsuccess = function () {
			console.log("Database deleted successfully")
		}
		deleteRequest.onerror = function () {
			console.error("An error occurred while deleting the database")
			console.error(error)
		}
	}

}
