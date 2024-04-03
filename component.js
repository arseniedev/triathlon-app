class SportComponent {
    name 
    duration
    distance
    // percentage 
// constructor(newDate, newTime, newFinisherTime, newLocation)
// duration in seconds!!
    constructor(theTrainingSession, newSportName, distanceTravelled = 0, newDuration = 0) { //newDistanceTravelled = 0.0, newTimePercentage = 0.0
        this.name = newSportName
        this.duration = newDuration
        this.distance = distanceTravelled
        this.myTraining = theTrainingSession
        this.avgSpeed = 0.0
    }

    toString() {
        this.calculateAverageSpeed()
        let result = ""
        result += `[${this.name}] - ${this.distance.toFixed(2)} kilometres - ${this.duration} seconds - ${this.avgSpeed.toFixed(2)}km/h`
        return result
    }

    calculateAverageSpeed() {
        return this.avgSpeed += this.distance / (this.duration / 3600)
    }
}
