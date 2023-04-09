import  MonacoEditor  from "@monaco-editor/react";
import React from "react"

const Editor:React.FC<any> = ({formated, onChange})=>{

    return<MonacoEditor 
    className="editor"
    onChange={onChange}
    value={formated}
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