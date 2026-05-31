/*
ViewModel: Acts as an intermediary between the View and the Model. It manages 
the state and operations related to the calculator.
*/

export default class TriathlonViewModel {
  constructor(triathlon, timer) {
    this.triathlon = triathlon
    this.timer = timer
    this.container = []

    this.timerState= false
    this.category = ["Swim", "Bike", "Run"]

    this.button = "Play"
    this.seconds = "00:00:00"

    this.init = this.init.bind(this)
    this.clear = this.clear.bind(this)
    this.cache = this.cache.bind(this)
    this.submit = this.submit.bind(this)
    this.display = this.display.bind(this)
    this.click = this.click.bind(this)
    this.search = this.search.bind(this)
  }


  click(action) {
    console.log(action)
    let out = {}
    if(action === "clear") {
      // this.clear()
      // out = this.setState(0, "-", "Play", false)
      // out['category'] = '-'
      // out['button'] = 'Play'
    } else if (action === "cache") {
      // out = this.cache()
      // setTimerButton(out.button)
    }
    return out
  }

  init() {
    this.altButton()
    return this.timerHandler()
    // console.log(this.timerState)
  }

  clear() {
    this.timerState = false
    this.container = []
    this.seconds = this.timer.reset()
    // document.getElementById('duration-entry').replaceChildren("")
    // document.querySelector("#interval_output").innerHTML = this.seconds
    return this.seconds 
  }

  cache() {
    let output// = {}
    let index = this.container.length

    let duration = this.timerHandler().elapsed
    let button = this.timerHandler().button

    if (index === 3) {
      output = this.setState(index, duration, button, true)
      this.seconds = this.timer.pause()
      // document.getElementById('ache-btn').disabled = true
    }

    else {
      output = this.setState(index, duration, button, false)
      // document.getElementById('ache-btn').disabled = false
    }
    return output
  }

  setState(index, duration, button, status) {
    let output = {}
    output['category']= this.category[index]
    output['time']= duration
    output['complete']= status
    output['button']= button
    this.container.push(output)
    return output
  }

  altButton() {
    let newState = !this.timerState
    this.timerState = newState
  }

  timerHandler() {
    // console.log(this.timerState)
    if (this.timerState) {
      this.button = "Pause"
      this.seconds = this.timer.start()
    }
    else {
      this.button = "Play"
      this.seconds = this.timer.pause()
    }
    return ({button:this.button, elapsed:this.seconds})
  }

  display() {
    // console.log(localStorage)
    return this.triathlon.loadFromLocalStorage()
  }

  search(targetID) {
    // let query = this.triathlon.findAthlete(targetID)
    console.log(this.triathlon.allMyAthletes)
    // if (query !== null) {
      // setDisplay(`[${query.id}] ${query.firstname} ${query.lastname}`)
  // } else {
      // setDisplay("Nothing has been found.")
  // }
  }

  submit(event) {
    event.preventDefault()
    let form = document.getElementById('athlete-form')
    let timers = this.container
    console.log(timers)
    let out = this.triathlon.handleForm(form,timers)

    form.reset()

    return out
  }
}