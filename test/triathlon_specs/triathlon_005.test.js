/* eslint-disable no-undef */
/* eslint no-undef: "error" */

import Triathlon from '../../src/triathlon.js'

describe('a Triathlon with shrinking ft', () => {
    let theTriathlon
    beforeEach(() => {
        theTriathlon = new Triathlon()
        theTriathlon.addAthlete("03", "Celia", "St.James", 24, 0.52, 0.35, 1.84)
        theTriathlon.addAthlete("02", "Harry", "Cameron", 25, 0.49, 0.56, 1.94)
        theTriathlon.addAthlete("04", "Renee", "Rodriguez", 22, 0.56, 0.84, 1.94)
        theTriathlon.addAthlete("01", "Evelyn", "Hugo", 26, 0.56, 0.64, 1.93)
    })

    describe('Successful removal of existent target item', () => {
        beforeEach(() => {
            const targetId = "01"
            theTriathlon.removeAthlete(targetId)
        })

        test('should match array length', () => {
            const actual = theTriathlon.allParticipants.length
            const expected = 3
            expect(actual).toBe(expected)
        })

        test('should match participant count', () => {
            const actual = theTriathlon.participantCount
            const expected = 3
            expect(actual).toBe(expected)
        })
    
        test('successful removal of existent target item, matches items id returned', () => {
            const idArray = theTriathlon.allParticipants.map(athlete => athlete.id)
            expect(idArray).toEqual(["02", "03", "04"])
        })
    })

    describe('Unsuccessful removal of existent target item', () => {
        let targetId
        beforeEach(() => {
            targetId = "05"
        })
        
        test('should handle non existent id error', () => {
            let expectedError = "Athlete with id 05 is not found"
            expect(() => theTriathlon.removeAthlete(targetId)).toThrow(expectedError)
        })

        test('should match unchanged array length', () => {
            let actual
            let expected = 4

            try {
                theTriathlon.removeAthlete(targetId)
                actual = theTriathlon.allParticipants.length
            } catch (error) {
                actual = theTriathlon.allParticipants.length
            }
            expect(actual).toBe(expected)
        })
    })
})