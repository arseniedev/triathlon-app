class Athlete {
    //?! Does the parent class needs properties if it is not going to be displayed?!
    // firstName
    // lastName
    // dateOfBirth
    // height
    // nationality
    // triathlonCategory
    // targetFinishTime

    // constructor(firstName,lastName,dateOfBirth,height,nationality,triathlonCategory,targetFinishTime) {
        // this.firstName = firstName
        // this.lastName = lastName
        // this.birthday = dateOfBirth
        // this.height = height
        // this.nationality = nationality
        // this.category = triathlonCategory
        trainingSessionCount = 0   // because of the constructor, the this is needed
        allTrainingSessions = []  // because of the constructor, the this is needed
        // }
    
    addTrainingDrill(newDate, newFinisherTime, newLocation) {
        // constructor(newTrainingCode, newDate, newFinisherTime, newLocation)
        const NEW_TRAINING = new TrainingDrill(newDate, newFinisherTime, newLocation, this)
        this.allTrainingSessions.push(NEW_TRAINING)
        this.trainingSessionCount += 1
    }

    sortTrainingSessions() {
        this.allTrainingSessions.sort((a, b) => a.date.localeCompare(b.date))
    }

    deleteTraining(targetSessionDate) { //date
        for (let index = 0; index < this.allTrainingSessions.length; index++) {
            if (this.allTrainingSessions[index].date === targetSessionDate.toString()) {
                this.allTrainingSessions.splice(index,1)
                break
            }
        }
    }

    findTraining(targetSessionDate) {
        return this.allTrainingSessions.find(aTraining => aTraining.date === targetSessionDate.toString()) //.toLocaleDateString('en-US', {day: '2-digit', month: 'short', year:'numeric'})
    }

    // findTraining(targetSessionDate) {
    //     let foundSession = null
    //     for (let aTraining of this.allTrainingSessions) {
    //         if (aTraining.date === targetSessionDate.toLocaleDateString()) {
    //             foundSession = aTraining
    //             break
    //         }
    //     }
    //     return foundSession
    // }
    
    //?! Are we marked for naming. Ex: getTraining vs displayTraining
    getAllTraining() { //getTrainingLog
        this.sortTrainingSessions()
        let result = ``
        for (let aTraining of this.allTrainingSessions) {
            result += `${View.tab()} ${aTraining} ${View.newline()}`
            
        }
        return result
    }

    getTraining() { //getTrainingLog
        this.sortTrainingSessions()
        let result = `This athlete has ${this.trainingSessionCount} logged trainings:${View.newline()}`
        for (let aTraining of this.allTrainingSessions) {
            result += `${View.tab()} ${aTraining} ${View.newline()}`
            
        }
        return result
    }

    getNonEmptyTraining() { //getTrainingDetails
        let result = ""
        this.sortTrainingSessions()
        for (let aTraining of this.allTrainingSessions) {
            if (aTraining.allSportsLog.length > 0) {
                result += `${aTraining}${View.newline()}`
            }
            result += `${aTraining.getComponentLog()}`
        }
        return result
    }

    getGoalReachedTraining(){
        let result = ``
        this.sortTrainingSessions()
        for (let aTraining of this.allTrainingSessions) {
            if(aTraining.hasReachedGoal() === true) {
            result += `${aTraining}${View.newline()}`
            }
        } 
        return result
    }

    //TODO getPercentage():String - calculate each sport duration weigh on the whole duration in percentage
}
