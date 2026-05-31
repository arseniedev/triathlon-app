/*
ViewModel: Acts as an intermediary between the View and the Model. It manages 
the state and operations related to the calculator.
*/

export default class TriathlonViewModel {
  constructor(triathlon, timer) {
    this.triathlon = triathlon
    this.timer = timer

    this.timerState= false
    this.category = ["Swim", "Bike", "Run"]
    this.container = []
    this.allValid = {}

    this.button = "Play"
    this.seconds = "00:00:00"

    this.init = this.init.bind(this)
    this.clear = this.clear.bind(this)

    this.cache = this.cache.bind(this)
    this.submit = this.submit.bind(this)
    this.display = this.display.bind(this)
    this.search = this.search.bind(this)
    this.validate = this.validate.bind(this)
    this.delete = this.delete.bind(this)
  }

  // validate(field, value) {
  //   let result = {}
  //   let isValid = false
    
  //   if(field ==='id'){
  //     isValid = this.triathlon.findAthlete(value) === null
  //   } else if (field ==='firstname') {
  //     isValid = /^[A-Za-z]+$/.test(value)
  //   }
  //   result[field] =  isValid ? 'Valid' : 'Please provide unique ID'
  //   this.allValid[field] = isValid

  //   return [result,this.altClickable()]
  // }

  clickable() {
    let test = this.allValid.id && this.allValid.firstname
    // console.log(test)
    return test
  }

  validate(field, value) {
    let result = {}
    let isValid = false

    if(field ==='id'){
      isValid = this.triathlon.findAthlete(value) === null
      result[field] =  isValid ? 'Valid' : 'Please provide unique ID'
      this.allValid[field] = isValid
    } else if (field ==='firstname') {
      isValid = /^[A-Za-z]+$/.test(value)
      result[field] =  isValid ? 'Valid' : 'Input must contain only letters, no special characters or numbers.'
      this.allValid[field] = isValid
    }
    return {prompt:result, readyToSave:this.clickable()}
  }

  init() {
    this.altButton()
    return this.timerHandler()
  }

  clear() {
    this.timerState = false
    return this.timerHandler(true)
  }

  cache() {
    let output// = {}
    let container = this.timer.allCacheDuration
    let index = container.length

    let duration = this.timerHandler().elapsed
    let button = this.timerHandler().button

    if (index === 2) {
      output = this.consolidate(index, duration, button, true)
      this.timer.reset()
      this.container = container
    }

    else {
      output = this.consolidate(index, duration, button, false)
    }
    return output
  }

  consolidate(index, duration, button, status) {
    let output = {}
    output['category']= this.category[index]
    output['time']= duration
    output['complete']= status
    output['button']= button
    let result = this.timer.cacheTime(output)
    return result
  }

  altButton() {
    let newState = !this.timerState
    this.timerState = newState
  }

  timerHandler(cleared=false) {
    if(cleared){
      this.button = "Play"
      this.seconds = this.timer.reset()
    } else {
      if (this.timerState) {
        this.button = "Pause"
        this.seconds = this.timer.start()
      }
      else {
        this.button = "Play"
        this.seconds = this.timer.pause()
      }
    }
    return ({button:this.button, elapsed:this.seconds})
  }

  search(value) {
    if (!value|| value === "-") return "-"
    let query = this.triathlon.findAthlete(value)
    return query === null ? 
      "No athlete found": 
      `Athlete Found: [${query.id}] ${query.firstname} ${query.lastname}`
  }

  display() {
    return this.triathlon.loadFromLocalStorage()
  }

  submit() {
    let form = document.getElementById('athlete-form')
    let timers = this.container
    let output = this.triathlon.handleForm(form, timers)
    this.triathlon.saveToLocalStorage(output)
    form.reset()

    return output
  }

  delete(id) {
    return this.triathlon.deleteAthlete(id)
  }
}
