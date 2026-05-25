/* eslint-disable no-undef */
/* eslint no-undef: "error" */

import Triathlon from '../../src/triathlon.js'

describe('Triathlon with required fields', () => {
    let theTriathlon

    beforeEach(() => {
        theTriathlon = new Triathlon()
    })

    test('should have a .date property', () => {
        expect(
            Object.hasOwn(theTriathlon, 'date'),
        ).toBeTruthy()
    })

    test('should have a .location property', () => {
        expect(
            Object.hasOwn(theTriathlon, 'location'),
        ).toBeTruthy()
    })

    test('should have a .swimDistance property', () => {
        expect(
        Object.hasOwn(theTriathlon, 'swimDistance'),
        ).toBeTruthy()
    })

    test('should have a .runDistance property', () => {
        expect(
            Object.hasOwn(theTriathlon, 'runDistance'),
        ).toBeTruthy()
    })

    test('should have a .bikeDistance property', () => {
        expect(
            Object.hasOwn(theTriathlon, 'bikeDistance'),
        ).toBeTruthy()
    })

    test('should have a .participantCount property', () => {
        expect(
            Object.hasOwn(theTriathlon, 'participantCount'),
        ).toBeTruthy()
    })

    test('should have a .allParticipants property', () => {
        expect(
            Object.hasOwn(theTriathlon, 'allParticipants'),
        ).toBeTruthy()
    })

    test('should have an array for the .allParticipants ', () => {
        expect(Array.isArray(theTriathlon.allParticipants)).toBeTruthy()
    })
})