import { useEffect, useRef, useState } from "react";
import {createRoot} from "react-dom/client"
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-npm";

const App = ()=>{
    const [code, setCode]= useState("");
    const typing = useRef();
    const getbuildService = useRef();
    const esbuildFunc= async ()=>{
       getbuildService.current= await esbuild.startService({
            worker:true,
            wasmURL:"/esbuild.wasm",
            
        })

    }
    useEffect(()=>{
        esbuildFunc();
    },[])

    const transpile=async()=>{
        if(!getbuildService.current){
            return;
        }
        const result = await getbuildService.current.build({
            entryPoints:['index.js'],
            bundle: true,
            write:false,
            plugins:[unpkgPathPlugin()],
            define:{
                'process.env.NODE_ENV':'"production"'
            }
        })
        console.log(result)
       setCode(result.outputFiles[0].text)
        
    }
    return(
        <div>
            <textarea ref={typing}/>
            <div>
            <button onClick={transpile}>submit</button>
        </div>
            <div>
            <pre>{code}</pre>
            </div>
        </div>
    )
}
const container = document.getElementById('root');
const root = createRoot(container)
root.render(<App/>);



