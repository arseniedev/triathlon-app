// npx create-react-app my-app
// cd my-app
// npm start
// main function - starting point of this web app
import AthleteModel from "./Data/athlete_model.js"
import TimerModel from "./Data/timer_model.js"
import TriathlonModel from "./Data/triathlon_model.js"
import TriathlonViewModel from "./Presentation/triathlon_viewmodel.js"
import TriathlonView from "./Presentation/triathlon_view.js"
import TriathlonDB from "./Data/database.js"

const db = new TriathlonDB()
const timer = new TimerModel(db)
const triathlon = new TriathlonModel(db)
const viewModel = new TriathlonViewModel(triathlon, timer)

const element = (
  <TriathlonView
      onInit={viewModel.init}
      onClear={viewModel.clear}
      onCache={viewModel.cache}
      onSubmit={viewModel.submit}
      onUpload={viewModel.display}
      onClick={viewModel.click}
      onSearch={viewModel.search}
    />
)

const container = document.getElementById("app")
const root = ReactDOM.createRoot(container)
root.render(element)
