export class Swimming {
    duration
    distance
    // percentage 
// constructor(newDate, newTime, newFinisherTime, newLocation)
constructor(newDuration = 0, defaultDistance = 0.75,) {
        //duration in s
        //distance in km
        //newDistanceTravelled = 0.0, newTimePercentage = 0.0

        // this.name = newSportName
        this.duration = newDuration
        this.distance = defaultDistance
        // this.percentage = newTimePercentage
    }

    toString() {
        let result
        result = `${this.distance.toFixed(2)} kilometres ${this.duration} seconds` // kilometres ${this.newTimePercentage.toFixed(2)}%
        return result
    }

    calculateAverageSpeed() {
        let result
        
    }
}
