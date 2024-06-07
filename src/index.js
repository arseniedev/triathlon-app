// npx create-react-app my-app
// cd my-app
// npm start
// main function - starting point of this web app

import TriathlonModel from "./Model/triathlon_model.js"
import TimerModel from "./Model/timer_model.js"
import TriathlonViewModel from "./ViewModel/triathlon_viewmodel.js"
import TriathlonView from "./View/triathlon_view.js"
import TriathlonDB from "./Storage/database.js"

const db = new TriathlonDB()
const timer = new TimerModel(db)
const triathlon = new TriathlonModel(db)
const viewModel = new TriathlonViewModel(triathlon,timer)


const element = (
    <TriathlonView 
          onInit={viewModel.init}
          onClear={viewModel.clear}
          onCache={viewModel.cache}
          onSubmit={viewModel.submit}
          onGetEntries={viewModel.display}
          onSearch={viewModel.search}
          onCheck={viewModel.validate}
          onDelete={viewModel.delete}
    />
)

const container = document.getElementById("app")
const root = ReactDOM.createRoot(container)
root.render(element)
