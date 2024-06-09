export default function Timer({initState, onInit, onClear, onCache, onReset, onLoad}) {
  const loadBtnHover = "Click to refresh storage."
  const timerBtnHover = "Click to play/pause timer."
  const resetBtnHover = "Click ONCE to clear cache. Click TWICE to clear storage"
  const cacheBtnHover = "Click to temporarily store timers."
  
  return (
      <div id="time_button" className="col-md-4">
        <div>
          <h1>Timer</h1>
          <h6 id="currentSport"></h6>
          <h2 id="interval_output">{initState.elapsed}</h2>
          <input type="button" className="tablinks" id="load-btn" value="Load" onClick={onLoad}title={loadBtnHover}></input>
          <input type="button" className="tablinks" id="pause-play-btn" value={initState.initButton} onClick={onInit}title={timerBtnHover}></input>
          <input type="button" className="tablinks" id="reset-btn" value="Reset" onClick={onClear} onDoubleClick={onReset} title={resetBtnHover}></input>
          <input type="button" className="tablinks" id="cache-btn" value="Cache" onClick={onCache} disabled={!initState.clickable}title={cacheBtnHover}></input>
          <p>Tip: Hover on buttons to see details!</p>
        </div>
    </div>
    )
  }