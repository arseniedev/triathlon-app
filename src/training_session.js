import { Cycling } from './cycling.js'
import { Swimming } from './swimming.js'
import { Running } from './running.js'
import { View } from './view.js'

export class TrainingSession {
    date 
    time
    finisherTime
    location 
    constructor(newDate = new Date().toLocaleDateString("en-IN"), newTime = "00:00", newFinisherTime = 0.0, newLocation = "unknown") {

        this.date = newDate
        this.time = newTime
        this.location = newLocation
        this.finisherTime = newFinisherTime

        this.allCyclingLogs = []
        this.allRunningLogs = []
        this.allSwimmingLogs = []
    }

    toString() {
        let result
        result = `${this.date} ${View.tab()}`
        result += `${this.time} ${View.tab()}`
        result += `${this.finisherTime.toFixed(2)} minutes ${View.tab()}`
        result += `${this.location} ${View.tab()}`

        return result
    }

    addCyclingLog(newDuration, bikeDistance = 20.0) {
        const NEW_CYCLE = new Cycling(newDuration, bikeDistance)
        this.finisherTime += newDuration
        this.allCyclingLogs.push(NEW_CYCLE)
    }

    addSwimmingLog(newDuration, swimmingDistance = 0.75) {
        const NEW_SWIM = new Swimming(newDuration, swimmingDistance)
        this.finisherTime += newDuration
        this.allSwimmingLogs.push(NEW_SWIM)
    }

    addRunningLog(newDuration, runningDistance = 5.0) {
        const NEW_RUN = new Running(newDuration, runningDistance)
        this.finisherTime += newDuration
        this.allRunningLogs.push(NEW_RUN)
    }
}
