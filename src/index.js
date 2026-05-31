// npx create-react-app my-app
// cd my-app
// npm start
// main function - starting point of this web app

// import Duration from "./Model/duration.js"
import TriathlonModel from "./Model/triathlon.js"
import Stopwatch from "./Model/stopwatch.js"
import TriathlonViewModel from "./ViewModel/triathlon_viewmodel.js"
import TriathlonView from "./View/triathlon_view.js"
import TriathlonDB from "./Storage/database.js"

const db = new TriathlonDB()
// const duration = new Duration()
const timer = new Stopwatch(db)
const triathlon = new TriathlonModel(db)
const viewModel = new TriathlonViewModel(triathlon,timer)


const element = (
    <TriathlonView 
          onInit={viewModel.init}
          onClear={viewModel.clear}
          onCache={viewModel.cache}
          onSubmit={viewModel.submit}
          onDisplay={viewModel.display}
          onSearch={viewModel.search}
          onCheck={viewModel.validate}
          onDelete={viewModel.delete}
    />
)

const container = document.getElementById("app")
const root = ReactDOM.createRoot(container)
root.render(element)
