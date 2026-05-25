import { Triathlon }        from './triathlon.js'
import { Cycling }          from './cycling.js'
import { Running }          from './running.js'
import { Swimming }         from './swimming.js'
import { Athlete }          from './athlete.js'

export class Controller {
    static setup() {
    let theAthlete = new Athlete(1, "John", "Doe", 30, 0.0, 0.0, 0.0, null)
        theAthlete.addTrainingSession("12/01/2024", "08:45", 45.0, "Green Hills")
        theAthlete.addTrainingSession("10/02/2024", "06:15", 65.3, "Everdeen Hall")
        theAthlete.addTrainingSession("24/02/2023", "15:32", 32.12, "Maxwells's Hall")
        return theAthlete
    }


}
