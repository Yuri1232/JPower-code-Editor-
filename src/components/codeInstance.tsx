import { useEffect, useState } from "react";
import bundle from "../bundler/index"
import Editor from "../components/editor";
import  parsers from "prettier/parser-babel";
import prettier from "prettier";
import Preview from "../components/preview";
import "../style/editor.css"
import Reizable from "./resizable";

const CodeInstance = ()=>{
    const [codes, setCodes] = useState("")
    const [code, setCode] = useState("")
    const [err, setErr] = useState("")
    const [formated, setFormated] = useState("")

    useEffect(()=>{
        const transpile=async()=>{
           const output = await bundle(code)
            setCodes(output.code);    
            setErr(output.err);
        }
       const timmer = setTimeout(transpile,1000);
        return () =>{
            clearTimeout(timmer);

        } 
    },[code])

        const onFormat =()=>{
            const formated = prettier.format(code,{
                parser:'babel',
                plugins:[parsers],
                semi:true,
                singleQuote:true,
                
            })
            setFormated(formated.replace(/\n/,''))

 } 
    return(
        <Reizable direction="vertical">
        <div className="overview">
            <Reizable direction="horizontal">
            <div className="editor">
            <button className="btu" onClick={onFormat}>Format</button>
        <Editor formated={formated} onChange={(value:string)=>setCode(value)}/>
            </div>
            </Reizable>
            {/* <div>
            <button onClick={transpile}>submit</button>
        </div> */}
            {/* <div>

          </div> */}
           <Preview code={codes} err={err}/>
        </div>

        </Reizable>
    )
}

export default CodeInstance;

