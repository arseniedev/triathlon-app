class Athlete {
    firstName
    lastName
    dateOfBirth
    height
    nationality
    triathlonCategory
    targetFinishTime

    trainingSessionCount = 0
    allTrainingSessions = []
    
    addTrainingSession(newDate, newTime, newFinisherTime, newLocation) {
        // constructor(newDate, newTime, newFinisherTime, newLocation)
        const NEW_TRAINING = new TrainingSession(newDate, newTime, newFinisherTime, newLocation)
        this.allTrainingSessions.push(NEW_TRAINING)
        this.trainingSessionCount += 1
    }

    sortTrainingSessions() {
        this.allTrainingSessions.sort((a, b) => {
            if (a.date < b.date) {
                return -1
            }
            if (a.date > b.date) {
                return 1
            }
            return 0
        })
    }
    // deleteTrainingSessions() {
    // }

    // findSession(targetTrainingDate) {
    //     return this.allTrainingSessions.find(
    //         (aTraining) => aTraining.date === targetTrainingDate
    //     )
    // }
    
    toString() {
        let result
        this.sortTrainingSessions()
        result = `This athlete has ${this.trainingSessionCount} logged trainings:${View.newline()}`
        // result += `${View.tab()}Date${View.tab()}Time${View.tab()}Location${View.tab()}Duration${View.newline()}`

        this.allTrainingSessions.forEach((aTrainingSession) => {
            result += View.tab() + aTrainingSession + View.newline()      
        })

        return result
    }
}
