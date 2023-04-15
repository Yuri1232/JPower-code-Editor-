import { useEffect, useState } from "react";
import Editor from "../components/editor";
import parsers from "prettier/parser-babel";
import prettier from "prettier";
import Preview from "../components/preview";
import "../style/editor.css";
import Reizable from "./resizable";
import { Cell } from "../state";
import { BindActions } from "../hooks/bindAction";
import { useTypedSelector } from "../hooks/type-selector";

interface CodeProps {
  code: Cell;
}

const CodeInstance: React.FC<CodeProps> = ({ code }) => {
  const [formated, setFormated] = useState("");

  const { updateCell, createBundle } = BindActions();
  const bundle = useTypedSelector((state) =>
    state.bundles ? state.bundles[code.id] : ""
  );

  const joinCode = useTypedSelector((state) => {
    const allCodes = state.cells?.order.map((id) => state.cells?.data[id]);
    if (!allCodes) {
      return;
    }
    const printFunc = `var look = (value) => {
        const root = document.querySelector("#root");
        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            ReactDOM.render(value, root)
          }else{
            root.innerHTML = JSON.stringify(value);
          }
        }else{
          root.innerHTML = value;

        }

      } `;

    const notPrintFunc = `var look = () => {}`;
    const sumOfAllCode = [];
    for (let c of allCodes) {
      if (c?.id === code.id) {
        sumOfAllCode.push(printFunc);
      } else {
        sumOfAllCode.push(notPrintFunc);
      }
      if (c?.type === "code") {
        sumOfAllCode.push(c?.content);
      }
      if (c?.id === code.id) {
        break;
      }
    }

    return sumOfAllCode;
  });

  useEffect(() => {
    if (!joinCode) {
      return;
    }
    const transpile = async () => {
      if (!bundle) {
        createBundle(code.id, joinCode.join("\n"));
        return;
      }
      createBundle(code.id, joinCode.join("\n"));
    };

    const timmer = setTimeout(transpile, 1000);
    return () => {
      clearTimeout(timmer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinCode?.join("\n"), code.id]);

  const onFormat = () => {
    const formated = prettier.format(code.content, {
      parser: "babel",
      plugins: [parsers],
      semi: true,
      singleQuote: true,
    });
    setFormated(formated);
  };
  return (
    <Reizable direction="vertical">
      <div className="overview">
        <Reizable direction="horizontal">
          <div className="editor">
            <button className="btu" onClick={onFormat}>
              Format
            </button>
            <Editor
              formated={formated}
              onChange={(value: string) => updateCell(code.id, value)}
            />
          </div>
        </Reizable>
        {!bundle || bundle.loading ? (
          <div className="loader">
            <img src="./image/Wedges-3s-200px.gif" alt="loader" />
          </div>
        ) : (
          <Preview code={bundle?.code} err={bundle?.err} />
        )}
      </div>
    </Reizable>
  );
};

export default CodeInstance;
