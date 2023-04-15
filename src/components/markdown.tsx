import MDEditor from "@uiw/react-md-editor";
import { useRef, useState, useEffect } from "react";
import "./markdown.css";
import { BindActions } from "../hooks/bindAction";

interface EditProps {
  edit: any;
}
const Markdown: React.FC<EditProps> = ({ edit }) => {
  const [editing, setEditing] = useState(false);
  const markdownElement = useRef<HTMLDivElement | null>(null);
  const { updateCell } = BindActions();

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
    return (
      <div className="editing" ref={markdownElement}>
        <MDEditor
          value={edit.content}
          onChange={(v: any) => updateCell(edit.id, v)}
        />
      </div>
    );
  }
  return (
    <div className="markdown" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={edit.content || "Click to edit"} />
    </div>
  );
};

export default Markdown;
