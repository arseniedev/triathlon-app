// <<CONTROLLER>>
class Controller {
    static setup() {
        // firstName,lastName,dateOfBirth,height,nationality,triathlonCategory,targetFinishTime
    let theTraining = new TriathlonDrill(new Date("24 Jan 2024"), "Everdeen Halls")

        //TODO if category !== 3, remove it, has to be a triathlon

        //!functional, but dependent on the existence of the date. Requires a condition to return a message.
        // newDuration, newName, newDistance, theTrainingSession
        theTraining.addSportComponent(42,"Swimming", 0.75)
        theTraining.addSportComponent(64,"Cycling", 20.0)
        theTraining.addSportComponent(2, "Running", 5.0)

        //TODO if name is empty, remove it
        // theTraining.removeComponentLog("Running")

        return theTraining
    }
}