export default function Timer({initState, onInit, onClear, onCache, onReset, onLoad}) {
    return (
      <div id="time_button" className="col-md-4">
        <div>
          <h1>Timer</h1>
          <h6 id="currentSport"></h6>
          <h2 id="interval_output">{initState.elapsed}</h2>
          <input type="button" className="tablinks" id="load-btn" value="Load" onClick={onLoad}></input>
          <input type="button" className="tablinks" id="pause-play-btn" value={initState.initButton} onClick={onInit}></input>
          <input type="button" className="tablinks" id="reset-btn" value="Reset" onClick={onClear} onDoubleClick={onReset} ></input>
          <input type="button" className="tablinks" id="cache-btn" value="Cache" onClick={onCache} disabled={!initState.clickable}></input>
        </div>
    </div>
    )
  }