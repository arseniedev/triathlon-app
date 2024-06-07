import AthleteTable from "../Components/athlete_table.js"
import Timer from "../Components/timer.js"
import Cache from "../Components/cache.js"
import AthleteForm from "../Components/form.js"


 // View is responsible for rendering the UI and handling user interactions.

export default function TriathlonView({onInit, onClear, onCache, onSubmit, onGetEntries, onSearch, onCheck, onDelete}) {
  const [elapsed, setElapsed] = React.useState('00:00:00')
  const [initButton, setInitButton] = React.useState('Play')
  const [cachedTimes, setCachedTimes] = React.useState([])

  const [clickable, setClickable] = React.useState(true)
  const [form, setForm] = React.useState()
  const [entry, setEntry] = React.useState(onGetEntries)

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
      // document.getElementById('currentSport').replaceChildren('')
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
    // handleLoadStorage()
    handleClear() //equivalent:setCachedTimes([]);setElapsed('00:00:00');setForm(false);setClickable(true)
    setEntry(onGetEntries())
    // location.reload()
  }

  const handleLoadStorage = () => {
    // onGetEntries()
    // console.log(onGetEntries())
    // setEntry(onGetEntries())
  }

  const handleResetStorage = () => {
    localStorage.clear()
    handleClear()
    location.reload()
  }

  // const handleDelete = (target) => {
    // console.log('delete')
    // onDelete(target)
    // console.log(onGetEntries())
    // setEntry(onGetEntries())

    // setEntry(onDelete(target))
    // handleLoadStorage()

    // let check = onCheck()
    // handleCompleteSet(check)
  // }

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
          // onLoad={handleLoadStorage}
        />
        <Cache
          initCache={cachedTimes}
          initForm={form}
        />
      </div>
      <div className="mt-4">
          <AthleteTable
            // onAppend={entry}
            onSearch={onSearch}
            onDelete={onDelete}
            onGet={entry}
          />
      </div>
    </div>

    )
  }