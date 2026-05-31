export class Cycling {
    duration
    distance
    speed

    constructor(newDuration = 0, defaultDistance = 20.0, newAverageSpeed = 0.0) {
        this.duration = newDuration
        this.distance = defaultDistance
        this.speed = newAverageSpeed
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
