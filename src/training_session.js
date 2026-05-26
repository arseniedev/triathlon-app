import { View } from './view.js'
import { Cycling } from './cycling.js'
import { Swimming } from './swimming.js'
import { Running } from './running.js'

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

    addCyclingLog(newDuration, defaultDistance = 20.0) {
        const NEW_CYCLE = new Cycling(newDuration, defaultDistance)
        this.finisherTime += newDuration
        this.allCyclingLogs.push(NEW_CYCLE)
    }

    addSwimmingLog(newDuration, defaultDistance = 0.75) {
        const NEW_SWIM = new Swimming(newDuration, defaultDistance)
        this.finisherTime += newDuration
        this.allSwimmingLogs.push(NEW_SWIM)
    }

    addRunningLog(newDuration, defaultDistance = 5.0) {
        const NEW_RUN = new Running(newDuration, defaultDistance)
        this.finisherTime += newDuration
        this.allRunningLogs.push(NEW_RUN)
    }

    displayLogs() {
        let result = ''
        if (this.allSwimmingLogs.length > 0) {
            result += `Swimming Logs: `
            for (const log of this.allSwimmingLogs) {
                result += `${log.toString()} `
            }
            result += `${View.newline()}`
        }
        if (this.allRunningLogs.length > 0) {
            result += `Running Logs: `
            for (const log of this.allRunningLogs) {
                result += `${log.toString()} `
            }
            result += `${View.newline()}`
        }
        if (this.allCyclingLogs.length > 0) {
            result += `Cycling Logs: `
            for (const log of this.allCyclingLogs) {
                result += `${log.toString()} `
            }
            result += `${View.newline()}`
        }
        return result
    }
}
