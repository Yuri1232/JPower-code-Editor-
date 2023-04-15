import { useRef, useEffect } from "react";
import "./preview.css";
interface PreviewProps {
  code: string;
  err: string;
}

const html = `<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,700;1,400;1,600 rel="stylesheet">
  <style>html {font-family: 'Nunito', sans-serif; background:#EDEADE}</style>
</head>
<body >
<div id="root"></div>
                <script>
                function errorHandler(err){
                  
                        const element = document.querySelector("#root");
                       element.innerHTML = '<div style="color:red; font-size:18px"><h3>Runtime error:</h3>'+ err +'</div>', console.error(err)
                }
                window.addEventListener("error", (event)=>{
                    event.preventDefault();
                    errorHandler(event.error)
                })
                window.addEventListener("message", (event)=>{
                      try{
                        eval(event.data)
                    }catch(err){
                    errorHandler(err)
                    }
                },false)
                </script>
                </body>
                  </html>`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const ifrem = useRef<any>();

  useEffect(() => {
    ifrem.current.srcdoc = html;
    setTimeout(() => {
      ifrem.current.contentWindow.postMessage(code, "*");
    }, 30);
  }, [code]);

  return (
    <div className="main-frame">
      <iframe
        title="max-frame"
        ref={ifrem}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && (
        <div className="err">
          <h3>RunTime error:</h3>
          {err}
        </div>
      )}
    </div>
  );
};

export default Preview;
