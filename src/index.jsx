
import {createRoot} from "react-dom/client"
import "./style/editor.css"
import {Provider} from "react-redux"
import { store } from "./state";
import CellList from "./components/cell-list";
import "./style/index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Header from "./components/header";



const App = ()=>{
    function headerSplit(){
        const header = document.querySelector("h1");
        const title = header.textContent;
        header.textContent = ""
        const span = title.split("");
        span.forEach(letter=>{
           const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        header.innerHTML += `<span style="color:#${randomColor}" class="head-letter">${letter}</span>`
       });
    }

    useEffect(()=>{
       headerSplit() 
    gsap.registerPlugin(ScrollTrigger)
    const hook= gsap.context(()=>{
    const tl =  gsap.timeline({defaults:{duration:1}});
    tl.fromTo(".head-letter", {y:30},{y:0,stagger:.08,duration:2, ease:"Elastic.easeOut"})
          tl.fromTo(".code-text",{scale:0},{scale:1, duration:2, ease:"Elastic.easeOut"},"<50%")
          tl.fromTo(".bottom-border",{x:2000},{x:0},"<20%")

        
         })
     return ()=>{
        hook.revert();
     }
    
    },[])


    return(
        <Provider store={store}>
        <div className="index">
            <Header/>
            <CellList/>
        </div>
        </Provider>
    )
}
const container = document.getElementById('root');
const root = createRoot(container)
root.render(<App/>);









