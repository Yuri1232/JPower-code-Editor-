import  MonacoEditor  from "@monaco-editor/react";
import React from "react"

interface Props {
    code:()=>void,
    formated:string
}

const Editor:React.FC<Props> = ({code, formated})=>{

    return<MonacoEditor
    className="editor"
    onChange={code}
    value={formated}
    height="500px" 
    theme="vs-dark"
    language="javascript"
    options={{
        tabIndex:2,
        fontSize:20,
        smoothScrolling:true,
        wordWrap:"on",
    }}
    />
}

export default Editor;