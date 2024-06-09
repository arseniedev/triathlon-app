import Timer from "../Components/timer_component.js"
import Cache from "../Components/cache_component.js"
import AthleteForm from "../Components/form_component.js"
import AthleteTable from "../Components/athlete_table.js"
import Calculator from "../Components/calculator_component.js"

 // View is responsible for rendering the UI and handling user interactions.

export default function TriathlonView({onInit, onClear, onCache, onSubmit, onDisplay, onSearch, onCheck, onDelete}) {
  const [elapsed, setElapsed] = React.useState('00:00:00')
  const [initButton, setInitButton] = React.useState('Play')
  const [cachedTimes, setCachedTimes] = React.useState([])

  const [clickable, setClickable] = React.useState(true)
  const [form, setForm] = React.useState()
  const [entry, setEntry] = React.useState(onDisplay)

  const initState = {
    elapsed: elapsed,
    initButton: initButton,
    clickable: clickable,
  }

  const handleTimer = () => {
      let timerProp = onInit()
      setInitButton(timerProp.button)
      setElapsed(timerProp.elapsed)
  }

  const handleClear = () => {
      const output = onClear()
      setElapsed(output.elapsed)
      setInitButton(output.button)
      setCachedTimes([])
      setForm()
      setClickable(true)
  }

  const cacheTime = () => {
    let cacheData = onCache()
    setCachedTimes([...cacheData])

    let recentEntry = cacheData[cacheData.length-1]
    document.getElementById('currentSport')
    .replaceChildren(recentEntry.category)
    handleCompleteSet(recentEntry.complete)
  }

  const handleSubmit = () => {
    onSubmit()
    handleClear() //equivalent:setCachedTimes([]);setElapsed('00:00:00');setForm(false);setClickable(true)
    setEntry(onDisplay())
    // location.reload()
  }

  const handleResetStorage = () => {
    localStorage.clear()
    handleClear()
    setTimeout(() => {
      alert('Data has been cleared.')
    }, 1000) // 150ms delay
    setEntry(onDisplay())
    // location.reload()
  }

  const handleDelete = (target) => {
    setEntry(onDelete(target))
  }

  const handleCompleteSet = (state=false) => {
    if(state){
      setClickable(false)
      setForm(<AthleteForm
        onClick={handleClear}
        onSave={handleSubmit}
        onCheck={onCheck}
      />)
    }
  }

    return (
    <div className="d-flex flex-column">
      <div className="d-flex row mb-5">
        <Timer
          initState={initState}
          onInit={handleTimer}
          onClear={handleClear}
          onCache={cacheTime}
          onReset={handleResetStorage}
        />
        <Cache
          initCache={cachedTimes}
          initForm={form}
        />
      </div>
      <div className="mt-4">
          <AthleteTable
            onSearch={onSearch}
            onDelete={handleDelete}
            onGet={entry}
          />
      </div>
      <div>
        <Calculator/>
      </div>
    </div>

    )
  }