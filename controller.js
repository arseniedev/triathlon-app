// <<CONTROLLER>>
class Controller {
    static setup() {
        // firstName,lastName,dateOfBirth,height,nationality,triathlonCategory,targetFinishTime
    let theAthlete = new Athlete()
    // let theAthlete = new Athlete("Arsenie","Sarmiento",new Date("01 Jan 2003"),"178cm","Filipino","Sprint", 7200)
    // function main() {
        //     let athlete
        //     athlete = new Athlete()
        //  ---
        //     View.clr()
        //     View.out(athlete)
        // }
        // constructor(newDate, newTime, newLocation) 
        theAthlete.addTrainingDrill(new Date("05 Jan 2024"),"Everdeen Hall") // 65.3
        theAthlete.addTrainingDrill(new Date("23 Feb 2024"),"Green Hills") // 45.0
        theAthlete.addTrainingDrill(new Date ("02 Feb 2024"),"Everdeen Hall") // 34.32
        theAthlete.addTrainingDrill(new Date ("22 Jan 2024"),"Heavensbee Gymnasium") // 57.11
        theAthlete.addTrainingDrill(new Date ("10 Dec 2024"),"Maxwell's Hall") // 48.5
        theAthlete.addTrainingDrill(new Date ("31 Dec 2023"),"Larcroft") // 32.12

        //TODO if category !== 3, remove it, has to be a triathlon
        // theAthlete.deleteTraining(new Date ("23 Feb 2024"))


        let theTraining = theAthlete.findTraining(new Date("22 Jan 2024"))
        //!functional, but dependent on the existence of the date. Requires a condition to return a message.
        // newSportName, newDuration, 
        // newDistanceTravelled, newTimePercentage
        theTraining.addComponentLog("Swimming", 0.75, 42)
        theTraining.addComponentLog("Cycling", 20.0, 64)
        theTraining.addComponentLog("Running", 5.0, 2)

        //TODO if name is empty, remove it
        // theTraining.removeComponentLog("Running")

        theTraining = theAthlete.findTraining(new Date("31 Dec 2023"))
        theTraining.addComponentLog("Swimming", 0.75, 34)
        theTraining.addComponentLog("Cycling", 20.0, 33)
        theTraining.addComponentLog("Running", 5.0, 3)

        theTraining = theAthlete.findTraining(new Date("10 Dec 2024"))
        theTraining.addComponentLog("Swimming", 0.75, 34)
        theTraining.addComponentLog("Cycling", 20.0, 33)
        theTraining.addComponentLog("Running", 5.0, 3)


        return theAthlete
    }
}
