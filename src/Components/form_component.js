
export default function AthleteForm({onClick, onSave, onCheck}) {
  const [valid, setValid] = React.useState('')
  const [seen, setSeen] = React.useState(false)
  const [clickable, setClickable] = React.useState(false)


  const handleAddButtonClick = () => {
    // console.log("Add button clicked")
    setSeen(true)
  }
  
  const handleDiscardButtonClick = () => {
    setSeen(false)
    onClick(true)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    onSave()
  }

  const validateInput = (event) => {
    const { name, value } = event.target
    let validated = onCheck(name, value)
    setValid(validated.prompt)
    setClickable(validated.readyToSave)
  }

  if (seen) {
    return (
      <form id="athlete-form" className="form p-4 bg-dark text-light d-flex flex-column justify-content-center" onSubmit={submitHandler}>
      <div id="form-header">    
          <h1 className="text-center">Add New Athlete</h1>
      </div>
      <div className = "container">
          <div className="form-element m-2 row">
              <label className="form-label col-sm-3" htmlFor="id">Athlete ID<span className="text-danger"> *</span></label>
              <input type="text" className="col-sm-4" id="id" name="id" onChange={validateInput} placeholder="Enter athlete ID" required/>
              <div className="form-validators form-element col-sm-5">{valid.id}</div>
          </div>
  
          <div className="form-element m-2 row">
              <label className="form-label col-sm-3" htmlFor="firstname">First Name<span className="text-danger"> *</span></label>
              <input type="text"  className="col-sm-4" id="firstname" name="firstname" onChange={validateInput} placeholder="Enter first name" required/>
              <div className="form-validators form-element col-sm-5">{valid.firstname}</div>
          </div>
  
          <div className="form-element m-2 row">
              <label className="form-label col-sm-3" htmlFor="lastname">Last Name</label>
              <input type="text"  className="col-sm-4" id="lastname" name="lastname" onChange={validateInput} placeholder="Enter surname"/>
          </div>
  
      </div>
      <div className="d-flex mt-4">
        <button type="submit" id="save-button" className="btn btn-primary w-50 mx-1" disabled={!clickable}>Save</button>
        <button id="discard-button" className="btn btn-secondary w-50 mx-1" onClick={handleDiscardButtonClick}>Discard</button>
      </div>
    </form>
    )
  }
  else {
    return (
      <button id="add-button" onClick={handleAddButtonClick}>Add Athlete Data</button>
    )
  }
}