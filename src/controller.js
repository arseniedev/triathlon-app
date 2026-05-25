import { Triathlon }        from './triathlon.js'
import { Cycling }          from './cycling.js'
import { Running }          from './running.js'
import { Swimming }         from './swimming.js'
import { Athlete }          from './athlete.js'

export class Controller {
    static setup() {
        const triathlon = new Triathlon(new Date('2024-06-15'), 'Central Park', 1.5, 10.0, 40.0)
        
        triathlon.addAthlete(1, "John", "Doe", 30, 25.0, 45.0, 120.0)
        triathlon.addAthlete(2, "Jane", "Smith", 28, 22.0, 42.0, 115.0)
        triathlon.addAthlete(3, "Mike", "Johnson", 35, 28.0, 48.0, 125.0)
        
        const athlete1 = triathlon.findAthlete(1)
        if (athlete1) {
            athlete1.addTrainingSession("12/01/2024", "08:45", 45.0, "Green Hills")
            athlete1.addTrainingSession("10/02/2024", "06:15", 65.3, "Everdeen Hall")
            
            if (athlete1.allTrainingSessions.length > 0) {
                athlete1.allTrainingSessions[0].addSwimmingLog(25.0, 1.5)
                athlete1.allTrainingSessions[0].addRunningLog(45.0, 10.0)
                athlete1.allTrainingSessions[0].addCyclingLog(120.0, 40.0)
            }
        }
        
        const athlete2 = triathlon.findAthlete(2)
        if (athlete2) {
            athlete2.addTrainingSession("15/01/2024", "07:30", 52.0, "River Track")
            if (athlete2.allTrainingSessions.length > 0) {
                athlete2.allTrainingSessions[0].addSwimmingLog(22.0, 1.5)
                athlete2.allTrainingSessions[0].addRunningLog(42.0, 10.0)
                athlete2.allTrainingSessions[0].addCyclingLog(115.0, 40.0)
            }
        }
        
        return triathlon
    }
}
