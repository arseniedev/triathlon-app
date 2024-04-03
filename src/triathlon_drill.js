class TriathlonDrill {
    // date
    // time
    // location
    componentCount = 0
    duration = 0.0
    avgSpeed = 0.0 //km/h
    
    TARGET_DURATION = 21 //seconds
    DISTANCE = 25.75 //km
    allTriathlonDrill = []
    // constructor(newDate, newTime, newduration, newLocation)
//TODO newFinisherTime not working as intended - See Athlete & Controller
    constructor(newDate, newLocation) { 
        //?! Do I need to put the toLocaleDateString in the class diagram?
        this.date = newDate.toLocaleDateString()//.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year:'numeric'})
        this.location = newLocation
    }

    sortComponent() {
        this.allTriathlonDrill.sort((a, b) => a.name.localeCompare(b.name))
    }

    addSportComponent(newDuration, newName, newDistance) {
        // newDuration, newName, newDistance, theTrainingSession
        let aSportComponent = new SportComponent(newDuration, newName, newDistance, this) //distanceTravelled, newTimePercentage
        // this.componentCount += 1
        this.allTriathlonDrill.push(aSportComponent)
    }

    //TODO Check first if the parent class exists
    removeComponentLog(targetComponent) { //date
        for (let index = 0; index < this.allTriathlonDrill.length; index++) {
            if (this.allTriathlonDrill[index].name === targetComponent) {
                this.allTriathlonDrill.splice(index,1)
                break
            }
        }
    }

    findSportLog(targetSportName) {
        return this.allTriathlonDrill.find(aComponent => aComponent.name === targetSportName) //.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year:'numeric'})
    }

    getSportComponent() {
        this.sortComponent()
        this.calculateTotalDuration()
        let result = `This drill has a duration of ${this.duration} seconds:${View.newline()}`
        for (let aLog of this.allTriathlonDrill){
            result += `${View.tab()}${aLog} ${View.newline()}`
        }
        result += `It is [${this.hasReachedGoal()}] that goal is reached.${View.newline()}`
        result += `With a speed of ${this.calculateAverageSpeed().toFixed(2)} km/h`
        return result
    }

    calculateTotalDuration() { //
        for (let aComponent of this.allTriathlonDrill) {
            this.duration += aComponent.duration
        }
        return this.duration //* How to say this is an updated value? Verify what you did on class diagram
    }

    hasReachedGoal() { //analyseTrainingSession
        this.calculateTotalDuration()
        return this.duration >= this.TARGET_DURATION
    }

    calculateAverageSpeed() {
        this.calculateTotalDuration()
        return this.avgSpeed += this.DISTANCE / (this.duration / 3600)
    }

}
