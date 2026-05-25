class Cycling {
    duration
    distance
    // percentage 
// constructor(newDate, newTime, newFinisherTime, newLocation)
constructor(newDuration = 0, defaultDistance = 20.0, newAverageSpeed = 0.0) {
        //duration in s
        //distance in km
        //newDistanceTravelled = 0.0, newTimePercentage = 0.0

        // this.name = newSportName
        this.duration = newDuration
        this.distance = defaultDistance
        this.speed = newAverageSpeed
        // this.percentage = newTimePercentage
    }

    toString() {
        let result
        this.calculateAverageSpeed()
        result = `${this.distance.toFixed(2)} kilometres ${this.duration} seconds ${this.speed.toFixed(2)} km/s` //${this.distance.toFixed(2)} kilometres ${this.newTimePercentage.toFixed(2)}%
        return result
    }

    calculateAverageSpeed() {
        this.speed += this.distance / this.duration
    }
}
