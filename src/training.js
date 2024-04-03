import TrainingDrill from './drill'

export default class  Training {
    constructor(newID, newLocation, newDate = new Date()) {
        this.id = newID
        this.location = newLocation
        this.date = newDate
        this.targetDuration = 360 //seconds //? constant value
        this.drillCount = 0 //? increasing value
        this.allDrillsLog = []
    }

    saveToStorage(drill) {
        window.localStorage.setItem(this.id, JSON.stringify(drill));
    return console.log(localStorage)
    }

    loadLocalStorate(){
        window.localStorage.getItem()
    }

    // removeDrill(targetDrillStartTime) { //time
    //     let result = this.discardChanges() //"not found"
    //     if (result === "Modifiable") {
    //         let index = this.allDrillsLog.indexOf(targetDrillStartTime)
    //         this.allDrillsLog.splice(index, 1)
    //         this.drillCount -= 1
    //         result = this.allDrillsLog
    //     }
    // return result
    // }

    updateDrill(startTime, keyItem, valueReplacement) {
        let aDrill = this.findTrainingDrill(startTime)
        aDrill[keyItem] = parseFloat(valueReplacement.toFixed(2))
        return this.allDrillsLog
    }

    addDrill(newTimeStamp, newSwimmingDuration, newRunningDuration, newCyclingDuration) {
        const newDrill = new TrainingDrill(newTimeStamp, newSwimmingDuration, newRunningDuration, newCyclingDuration)
        this.allDrillsLog.push(newDrill)
        this.saveToStorage(newDrill)
        this.drillCount += 1
    }

    findTrainingDrill(targetDrillStartTime) {
        let foundDrill = null
        for (let aDrill of this.allDrillsLog) {
            if (aDrill.time === targetDrillStartTime) {
                foundDrill = aDrill
                break
            }
        }
        return foundDrill
    }
}
