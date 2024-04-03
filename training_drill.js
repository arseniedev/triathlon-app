class TrainingDrill {
    date 
    // time
    duration
    location 
// constructor(newDate, newTime, newduration, newLocation)
//TODO newFinisherTime not working as intended - See Athlete & Controller
    constructor(newDate = Date.now(), newLocation, theAthlete) { 
        //?! Do I need to put the toLocaleDateString in the class diagram?
        this.date = newDate.toString()//.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year:'numeric'})
        // this.time = newTime
        this.location = newLocation
        this.duration = 0.0
        
        // this.sectionsCount = 0
        this.myAthlete = theAthlete //?! should this be used?
        this.targetDuration = 21 //seconds    //?! is it best practice to put this here even though it's not a changing value?
        this.allSportsLog = []
    }

    toString() {
        let result
        this.calculateFinisherTime()
        // this.hasReachedGoal()
        // result = `${this.name} ( ${this.colour} ) @ $${this.cost.toFixed(2)}`
        // result = `${this.date}${View.tab()}${this.time}${View.tab()} ${this.duration.toFixed(2)} minutes${View.tab()}${this.location}`
        result = `[${this.hasReachedGoal()}] ${this.date} -  ${this.duration.toFixed(2)} minutes [${this.location}] ${View.tab()}` //.format('DD MMM YYYY')
        return result
    }

    sortComponentLog() {
        this.allSportsLog.sort((a, b) => a.name.localeCompare(b.name))
    }

    addComponentLog(newSportName, distanceTravelled, newDuration) {//addComponentLog
        // newSportName, newDuration,// newDistanceTravelled, newTimePercentage
        const NEW_SPORT_LOG = new SportComponent(this, newSportName, distanceTravelled, newDuration) //distanceTravelled, newTimePercentage
        this.allSportsLog.push(NEW_SPORT_LOG)
        // this.sectionsCount += 1
        //? Should this be in a separate function? If so, how to reference the 'newDuration'
        // this.duration += newDuration
    }

    //TODO Check first if the parent class exists
    removeComponentLog(targetComponent) { //date
        for (let index = 0; index < this.allSportsLog.length; index++) {
            if (this.allSportsLog[index].name === targetComponent) {
                this.allSportsLog.splice(index,1)
                break
            }
        }
    }

    calculateFinisherTime() { //
        // let result
        for (let aComponent of this.allSportsLog) {
            this.duration += aComponent.duration
        }
        return this.duration //?! How to say this is an updated value? Verify what you did on class diagram
    }

    getComponentLog() {
        let result = ``
        this.sortComponentLog()
        for (let aLog of this.allSportsLog){
            result += `${View.tab()}${aLog} ${View.newline()}`
        }
        return result
    }

    hasReachedGoal() { //analyseTrainingSession
        this.calculateFinisherTime()
        return this.duration >= this.targetDuration
    }
}
