// <<CONTROLLER>>
class Controller {
    static setup() {
    let theAthlete = new Athlete()
    // function main() {
        //     let athlete
        //     athlete = new Athlete()
        //  ---
        //     View.clr()
        //     View.out(athlete)
        // }
        // constructor(newDate, newTime, newFinisherTime, newLocation)
        theAthlete.addTrainingSession("12/01/2024", "08:45", 45.0, "Green Hills")
        theAthlete.addTrainingSession("10/02/2024", "06:15", 65.3, "Everdeen Hall")
        theAthlete.addTrainingSession("24/02/2023", "15:32", 32.12, "Maxwells's Hall")

        // let theTraining = theAthlete.trainingLogDate("12/01/2024")
        // newSportName, newDuration, 
        // newDistanceTravelled, newTimePercentage

        // theTraining.addCyclingLog(123)
        // theTraining.addCyclingLog(332)
        // theTraining.addCyclingLog(355)

        return theAthlete
    }
}
