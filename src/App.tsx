import Routing from "./pages"
import "./app/Styles/GlobalStyles.scss"
import { Provider } from "react-redux"
import { store } from "./app/Redux/Store/Index"

function App() {

    return (
        <Provider store={store}>
                <Routing />
        </Provider>
    )
}

export default App
