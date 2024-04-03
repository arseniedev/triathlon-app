/* eslint linebreak-style: ["error", "unix"]*/

import Training from '../src/training' //whole

describe("localStorage in the js file with Jest", function() {
  let theTraining
  beforeEach(() => {
    theTraining = new Training("1", "Place", new Date())
  })

  describe("localStorage with Jest", () => {
    it("init", () => {
      expect(window.localStorage.length).toEqual(0);
    })

    test("data can be saved", () => {
      const drillMock = {
        time: "09:45",
        swimTime: 21.3,
        runTime: 189.54,
        bikeTime: 2323.09
    }
    theTraining.saveToStorage(drillMock)
    
    expect(window.localStorage.length).toEqual(1);

    })
})

})

