import { useEffect, useRef, useState } from "react";
import {createRoot} from "react-dom/client"
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-npm";
import { load_plugin } from "./plugins/load-plugin";

const App = ()=>{
    const typing = useRef();
    const ifrem = useRef();
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
        ifrem.current.srcdoc= html;
        const result = await getbuildService.current.build({
            entryPoints:['index.js'],
            bundle: true,
            write:false,
            plugins:[
                unpkgPathPlugin(),
                load_plugin(typing.current.value)
            ],
            define:{
                'process.env.NODE_ENV':'"production"'
            }
        })
        
        ifrem.current.contentWindow.postMessage( result.outputFiles[0].text,"*" )

        
    }
    
    
    const html = `<html>
    <head>
                <body>
                <div id="root"></div>
                <script>
                window.addEventListener("message", (event)=>{
                    try{
                        eval(event.data)
                    }catch(err){
                        const element = document.querySelector("#root");
                       element.innerHTML = '<div>'+ err +'</div>', console.error(err)
                    }
                },false)
                </script>
                </body>
                </head>
                  </html>`
    return(
        <div>
            <textarea ref={typing}/>
            <div>
            <button onClick={transpile}>submit</button>
        </div>
            <div>

            </div>
            <iframe ref={ifrem} sandbox="allow-scripts" srcDoc={html}></iframe>
        </div>
    )
}
const container = document.getElementById('root');
const root = createRoot(container)
root.render(<App/>);



