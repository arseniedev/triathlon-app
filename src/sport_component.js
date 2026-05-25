class SportComponent {
    // duration //s
    // name
    // distance
    // avgSpeed = 0.0 //km/h
    constructor(newDuration = 0, newName, newDistance, theTrainingSession) { //newDistanceTravelled = 0.0, newTimePercentage = 0.0
        this.duration = newDuration
        this.name = newName
        this.distance = newDistance
        this.myTraining = theTrainingSession
    }

    toString() {
        // this.calculateAverageSpeed()
        let result = ""
        result += `[${this.name}] - ${this.distance.toFixed(2)} kilometres - ${this.duration} seconds` // \- ${this.avgSpeed.toFixed(2)}km/h`
        return result
    }

    // calculateAverageSpeed() {
    //     return this.avgSpeed += this.distance / (this.duration / 3600)
    // }
}