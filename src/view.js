export class View {
    static blank() {
        return ""
    }

    static space() {
        return "&nbsp;"
    }

    static tab() {
        return View.space().repeat(4)
    }

    static newline() {
        return "<br>"
    }

    static clr() {
        document.body.style.fontFamily = "Courier New"
        document.body.innerHTML = ""
    }

    static out(newText) {
        document.body.innerHTML += newText
    }

    static displayTriathlon(triathlon) {
        let result = `<b>${triathlon.toString()}</b>${View.newline()}${View.newline()}`
        return result
    }

    static displayAllAthletes(triathlon) {
        let result = `<b>Athletes:</b>${View.newline()}`
        for (const athlete of triathlon.allParticipants) {
            result += `${athlete.displayDetails()}${View.newline()}`
            if (athlete.allTrainingSessions.length > 0) {
                result += `${View.tab()}<b>Training Sessions:</b>${View.newline()}`
                for (const session of athlete.allTrainingSessions) {
                    result += `${View.tab()}${View.tab()}${session.toString()}${View.newline()}`
                    result += `${View.tab()}${View.tab()}${session.displayLogs()}${View.newline()}`
                }
            }
            result += View.newline()
        }
        return result
    }

    static displayAthleteStats(triathlon) {
        let result = `<b>Statistics:</b>${View.newline()}`
        result += `Average Speed: ${triathlon.calculateAvgSpeed()} kph${View.newline()}`
        result += `<b>Above Average Performers:</b>${View.newline()}`
        for (const athlete of triathlon.allParticipants) {
            if (triathlon.isAboveAvg(athlete.id)) {
                result += `${View.tab()}${athlete.firstname} ${athlete.lastname}: ${athlete.calculateSpeedKph()} kph${View.newline()}`
            }
        }
        return result
    }
}
