class TrainingSession {
  
    date 
    time
    finisherTime
    location 
// constructor(newDate, newTime, newFinisherTime, newLocation)
    constructor(newDate = new Date().toLocaleDateString("en-IN"), newTime = "00:00", newFinisherTime = 0.0, newLocation = "unknown") {

        this.date = newDate
        this.time = newTime
        this.location = newLocation
        this.finisherTime = newFinisherTime

        this.allCyclingLogs = []
        this.allRunningLogs = []
        this.allSwimmingLogs = []
        // this.sectionsCount = 0
    }

    toString() {
        let result
        // result = `${this.name} ( ${this.colour} ) @ $${this.cost.toFixed(2)}`
        // result = `${this.date}${View.tab()}${this.time}${View.tab()} ${this.finisherTime.toFixed(2)} minutes${View.tab()}${this.location}`
        result = `${this.date} ${View.tab()}`
        result += `${this.time} ${View.tab()}`
        result += `${this.finisherTime.toFixed(2)} minutes ${View.tab()}`
        result += `${this.location} ${View.tab()}`

        return result
    }

    addCyclingLog(newDuration) {
        const NEW_CYCLE= new Cycling(newDuration, defaultDistance) //newDistanceTravelled, newTimePercentage
        this.finisherTime += newDuration
        this.allCyclingLogs.push(NEW_CYCLE)
    }

    // addSwimmingLog(newDuration) {
    //     const NEW_SWIM = new Swimming(newDuration, defaultDistance) //newDistanceTravelled, newTimePercentage
    //     this.finisherTime += newDuration
    //     this.allSwimmingLogs.push(NEW_SWIM)
    // }

    // addRunningLog(newDuration) {
    //     const NEW_RUN = new Running(newDuration, defaultDistance) //newDistanceTravelled, newTimePercentage
    //     this.finisherTime += newDuration
    //     this.allSwimmingLogs.push(NEW_RUN)
    // }

    // sortLog() {
    //     this.allTrainingSessions.sort((a, b) => {
    //         if (a.newDuration < b.newDuration) {
    //             return -1
    //         }
    //         if (a.newDuration > b.newDuration) {
    //             return 1
    //         }
    //         return 0
    //     })
    // }
}
