export class Running {
    duration
    distance
    speed
    // percentage 
// constructor(newDate, newTime, newFinisherTime, newLocation)
constructor(newDuration = 0, defaultDistance = 5.0) {
        //duration in s
         //distance in km
        //newDistanceTravelled = 0.0, newTimePercentage = 0.0

        // this.name = newSportName
        this.duration = newDuration
        this.distance = defaultDistance
        this.speed = 0.0
        // this.percentage = newTimePercentage
    }

    toString() {
        let result
        result = `${this.distance.toFixed(2)} kilometres ${this.duration} seconds` //${this.distance.toFixed(2)} kilometres ${this.newTimePercentage.toFixed(2)}%
        return result
    }

    calculateAverageSpeed() {
        if (this.duration === 0) {
            this.speed = 0
        } else {
            this.speed = this.distance / this.duration
        }
        return this.speed
    }
}
