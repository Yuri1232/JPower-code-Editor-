import MDEditor from "@uiw/react-md-editor";
import { useRef, useState, useEffect } from "react";
import "./markdown.css";

const Markdown = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("header");
  const markdownElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        markdownElement.current &&
        event.target &&
        markdownElement.current.contains(event.target as Node)
      ) {
        setEditing(true);
        return;
      } else {
        setEditing(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    console.log("ind", editing);
    return (
      <div className="editing" ref={markdownElement}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }
  return (
    <div className="markdown" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default Markdown;
