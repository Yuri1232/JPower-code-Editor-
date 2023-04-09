
import {createRoot} from "react-dom/client"
import "./style/editor.css"
import Markdown from "./components/markdown";
import CodeInstance from "./components/codeInstance";
import {Provider} from "react-redux"
import { store } from "./state";

const App = ()=>{

    return(
        <Provider store={store}>
        <div>
            <CodeInstance/>
            {/* <Markdown/> */}
        </div>
        </Provider>
    )
}
const container = document.getElementById('root');
const root = createRoot(container)
root.render(<App/>);









