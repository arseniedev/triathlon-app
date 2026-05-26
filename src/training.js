import TrainingDrill from './drill'
import Storage from './storage'

export default class  Training {
    constructor(newID, newLocation, newDate = new Date()) {
        this.id = newID
        this.location = newLocation
        this.date = newDate
        this.targetDuration = 360 //seconds //? constant value
        this.drillCount = 0 //? increasing value
        this.allDrillsLog = []
        this.storage = new Storage()
    }

    saveToStorage(drill) {
        return this.storage.saveById(this.id, drill)
    }

    loadLocalStorage(){
        return this.storage.loadLocalStorage(this.id)
    }

    updateDrill(startTime, keyItem, valueReplacement) {
        let aDrill = this.findTrainingDrill(startTime)
        if (!aDrill) {
            return this.allDrillsLog
        }
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
            if (!aDrill.time) {
                aDrill.formatDateTime()
            }
            if (aDrill.time === targetDrillStartTime) {
                foundDrill = aDrill
                break
            }
        }
        return foundDrill
    }

    removeDrill(targetDrillStartTime) {
        const targetItem = this.findTrainingDrill(targetDrillStartTime)
        const isPresent = targetItem !== null
        if (isPresent) {
            const index = this.allDrillsLog.indexOf(targetItem)
            this.allDrillsLog.splice(index, 1)
            this.drillCount -= 1
            return this.allDrillsLog
        }
        return null
    }
}
