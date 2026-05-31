export class Swimming {
    duration
    distance
    speed

    constructor(newDuration = 0, defaultDistance = 0.75) {
        this.duration = newDuration
        this.distance = defaultDistance
        this.speed = 0.0
    }

    toString() {
        let result
        this.calculateAverageSpeed()
        result = `${this.distance.toFixed(2)} km ${this.duration} seconds ${this.speed.toFixed(2)} km/s`
        return result
    }

    calculateAverageSpeed() {
        if (this.duration > 0) {
            this.speed = parseFloat((this.distance / this.duration).toFixed(2))
        }
        return this.speed
    }
}
