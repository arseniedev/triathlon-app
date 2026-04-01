// TODO: Run feat_014-016_index.html

//! FEATURE # 15 TIMEOUT
let timeOutInterval
let countdown = 5

function timeOut() {
  if (countdown > 0)  {
    setOutput("#prompt", `Discard training?<h6>Clock resetting in ${countdown}...</h6>`)
    countdown--
    setTimeout(() => {
      timeOut()
    }, 1000);
  } else {
    timeOutInterval = setOutput("#prompt", ``)
    clearTimeout(timeOutInterval)
    countdown = 5
    resetTimer()
  }
}

//! FEATURE # 15 INTERVAL
let intervalID
let keyIndex = 0
let milliseconds
let isRunning
let trainingStorage
let trainingSet
let interval = 10

restartTimer()

function restartTimer() {
  isRunning = false
  milliseconds = 0
  trainingStorage  = []
  trainingSet = [] //
  setOutput("#interval_output", `<h3>${formatTime(milliseconds)}</h3>`)
}

function resetTimer() { 
  keyIndex = 0
  restartTimer()
  clearInterval(intervalID)
  setOutput("#prompt", "Timer Reset")
  setOutput("#list_output", '')
}

function timerPlayPause() {
  const button = document.getElementById("pause-play")
  isRunning = !(isRunning)
  if (isRunning) {
    startTimer()
    button.value = "Pause"
    setOutput("#prompt", "Swimming -> Biking -> Running")
    // setOutput("#prompt", `Session: ${session}`)
  }
  else {
    button.value = "Play";
    setOutput("#prompt", "-- Paused --")
    isRunning = false
    clearInterval(intervalID)
  }
}

function startTimer() {
  clearInterval(intervalID)
  intervalID = setInterval(() => {
    incrementTimer()
    .then(milliseconds => {
      setOutput("#interval_output", `<h3>${formatTime(milliseconds)}</h3>`)
    })
    .catch(error => {
      throw new Error(`Time increment error: ${error.message}`)
    })
    }, interval)
}

// function startTimer() {
//   clearInterval(intervalID)
//   intervalID = setInterval(() => {
//     incrementTimer()
//     setOutput("#interval_output", `<h3>${formatTime(milliseconds)}</h3>`)
//     }, interval)
// }

function saveData() {
  if (!isRunning) {
  alert('Timer is paused. Click Pause/Play button to resume.')
  }
  else {
    timerPlayPause()
    setOutput("#prompt", `Training saved: ${formatTime(milliseconds)}`)
    trainingSet.push(formatTime(milliseconds))

    // restart time
    milliseconds = 0
    let theTraining = []

    if (trainingSet.length === 3) {
      keyIndex += 1
      theTraining.push(keyIndex)
      theTraining.push(trainingSet)
      trainingStorage.push(theTraining)

      trainingSet = [] // clear set
      getList() // display storage
    }
  }
}

function getList() {
  let duration_content = ``
  for (const aTrain of trainingStorage) {
    const trainDataset = aTrain[1]
    duration_content =`<td>Training-00${aTrain[0]}</td>&emsp;  | `
    for (const value of trainDataset) {
      duration_content += `<td>${value}</td>&emsp; | `
    }
  }
  displayTrainingData('#list_output', duration_content)
}

function displayTrainingData(duration_tag, duration_content) {
  let header = `<h3>SAVED TRAINING DATA:</h3>`
  header += `<th>&emsp; ID &emsp;</th>`
  header += `<th>&emsp; Swim &emsp;</th>`
  header += `<th>&emsp; Bike &emsp;</th>`
  header += `<th>&emsp; Run &emsp;</th>`
  const header_tag = '#record_header'
  const header_content =  `<h5>${header}</h5>`
  
  document.querySelector(header_tag).innerHTML = `<h5>${header_content}</h5>`
  document.querySelector(duration_tag).innerHTML += `<h6>${duration_content}</h6>`
  restartTimer()
}

function setOutput(tag, outputContent) {
  document.querySelector(tag).innerHTML = outputContent
}

//! FEATURE # 14 ERROR HANDLER
function incrementTimer() {
  return new Promise((resolve, reject) => {
      try {
        milliseconds++
          resolve(milliseconds);
      } catch (error) {
          reject(error);
      }
  });
}
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}
function pad(value) {
  return String(value).padStart(2, '0');
}


//! FETCHING CONTENT FOR HTML
function getContent(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  // document.getElementById(tabName).style.display = "block";
  // evt.currentTarget.className += " active";

  // document.getElementById("blankPage").click()
}
