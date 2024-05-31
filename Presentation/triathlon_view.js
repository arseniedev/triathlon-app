 // View is responsible for rendering the UI and handling user interactions.
 function TriathlonView({
  onInit,
  onClear,
  onCache,
  onSubmit,
  onUpload,
  onClick,
  onSearch,
})
{

  const [clickable, setClickable] = React.useState(true)
  const [entry, setEntry] = React.useState(onUpload())
  const [timestampList, setTimestampList] = React.useState([])
  const [formVisibility, setFormVisibility] = React.useState()
  const [timer, setTimer] = React.useState('00:00:00')
  const [category, setCategory] = React.useState('-')
  const [timerButton, setTimerButton] = React.useState('Play')
  
  const [sort, setSort] = React.useState({ keyToSort: "id", direction: "asc" })
  
  const headers = [
    {id: 1,key: "id", label: "Athlete ID"},
    {id: 2,key: "firstname", label: "First Name"},
    {id: 3,key: "lastname", label: "Last Name"},
    {id: 5,key: "Swim", label: "Swim Duration"},
    {id: 6,key: "Run", label: "Run Duration"},
    {id: 7,key: "Bike", label: "Bike Duration"},
  ]
  let defaultAthletes =
    [
        {id: "DEF-00", firstname: "Jane", lastname: "Doe", age: 0, swimTime: 0.0, runTime: 0.0, bikeTime: 0.0}
    ]

  const handleClick = (action) => {
    const out = onClick(action)

  }

const sortAllAthletes = (arrayToSort) => {
  return arrayToSort.sort((a, b) => {
      if (sort.direction === 'asc') {
          return a[sort.keyToSort] >  b[sort.keyToSort] ? 1 : -1
      } else{
          return a[sort.keyToSort] >  b[sort.keyToSort] ? -1 : 1
      }
  })
}

  const handleSearch = (event) => {
    const value = event.target.value
    console.log(onSearch(value))
  }

  const submitHandler = (data) => {
    const formData = onSubmit(data)
    setEntry(onUpload())

    setFormVisibility()
    document.getElementById('duration-entry').replaceChildren("")
    setTimerButton('Play')
    onClear()
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    console.log({ ...entry, [name]: value })
  }

  const handleClear = () => {
    setCategory('-')
    setTimerButton('Play')
    onClear()
    setFormVisibility()
    document.getElementById('athlete-entry').replaceChildren("")
    document.getElementById('duration-entry').replaceChildren("")
  }

  const handleHeaderClick = (column) => {
    setSort(
      {
        keyToSort: column.key,
        direction:
        column.key === sort.keyToSort ? sort.direction === "asc" ? "desc" : "asc" : "desc"
      }
    )
  }

  const handleTimer = () => {
    const timerProp = onInit()
    setTimerButton(timerProp.button)
    setTimer(timerProp.elapsed)
  }

  const cacheTime = () => {
    let cacheData = onCache()
    setTimerButton(cacheData.button)
    
    if (cacheData.complete) {
      setFormVisibility(athleteForm)
      setClickable(false)
    }
    else {
      setCategory(cacheData.category)
      tabulateTimer(cacheData)
    }
  }

  const handleResetStorage = () => {
    localStorage.clear()
    onClear()
    document.getElementById('athlete-entry').replaceChildren("")
    document.getElementById('duration-entry').replaceChildren("")
  }

  const closeForm = () => {
    setFormVisibility()
  }

  const tabulateTimer = (entry) => {
    let row = ''
      row = document.createElement('tr')
      row.innerHTML = `
      <td>${entry.category}</td>
      <td>${entry.time}</td>`
      document.getElementById('duration-entry').appendChild(row)
  }
  
  const athleteForm = () => {
    return (
        <form id="athlete-form" className="form p-4 bg-dark text-light d-flex flex-column justify-content-center" onSubmit={submitHandler}>
          <div id="form-header">    
              <h1 className="text-center">Add New Athlete</h1>
          </div>
          <div className = "container">
              <div className="form-element m-2 row">
                  <label className="form-label col-sm-3" htmlFor="id">Athlete ID<span className="text-danger"> *</span></label>
                  <input type="text"  className="col-sm-4" id="id" name="id" placeholder="Enter athlete ID" required/>
                  <div className="form-validators form-element col-sm-5">X</div>
              </div>

              <div className="form-element m-2 row">
                  <label className="form-label col-sm-3" htmlFor="firstname">First Name<span className="text-danger"> *</span></label>
                  <input type="text"  className="col-sm-4" id="firstname" name="firstname" placeholder="Enter first name" required/>
                  <div className="form-validators form-element col-sm-5">X</div>
              </div>

              <div className="form-element m-2 row">
                  <label className="form-label col-sm-3" htmlFor="lastname">Last Name</label>
                  <input type="text"  className="col-sm-4" id="lastname" name="lastname" placeholder="Enter surname"/>
                  <div className="form-validators form-element col-sm-5">X</div>
              </div>

          </div>
          <div className="d-flex mt-4">
            <button type="submit" id="save-button" className="btn btn-primary w-50 mx-1">Save</button>
            <button id="discard-button" className="btn btn-secondary w-50 mx-1" onClick={closeForm}>Discard</button>
          </div>
        </form>
    )
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex row mb-5">
        <div id="time_button" className="col-md-3">
          <h1>Timer</h1>
          <h6>{category}</h6>
            <h1 id="interval_output">{timer}</h1>
            <input type="button" className="tablinks" id="pause-play-btn" onClick={handleTimer}value={timerButton}></input>
            <input type="button" className="tablinks" id="reset-btn" onClick={handleClear} onDoubleClick={handleResetStorage} value="Reset"></input>
            <input type="button" className="tablinks" id="cache-btn" onClick={cacheTime} disabled={!clickable} value="Cache"></input>
        </div>
        <div id="display" className="col-md-9">
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody id="duration-entry">
              {timestampList}
            </tbody>
          </table>
        </div>
      </div>
      <div>{formVisibility}</div>
      <div className="mt-4">
        <h1>Triathlon Athletes</h1>
        <input id="search-input" onChange={handleSearch} placeholder="Search Athlete"/>
        <input type="button" onClick={() => { handleClick('clear');}}value="Clear"></input>
        <table className="table mt-3">
          <thead>
            <tr>
              {headers.map((header,index) => (
                <th scope="col" key={index} onClick={() => handleHeaderClick(header)}>
                    <span>{header.label}</span>
                </th>
              ))} 
            </tr>
          </thead>
          <tbody id="athlete-entry">
            {sortAllAthletes(entry).map((row, index) => (
              <tr key={index}>
                  {headers.map((header, index) => (
                      <td key={index}>
                          <span>{row[header.key]}</span>
                      </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TriathlonView