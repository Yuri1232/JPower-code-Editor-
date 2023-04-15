import MonacoEditor from "@monaco-editor/react";

const Editor: React.FC<any> = ({ formated, onChange }) => {
  const initial: string = `
// "look" helper function: you can use this function to display your code on Preview window on the right side.
look('');
`;
  return (
    <MonacoEditor
      className="editor"
      onChange={onChange}
      value={formated}
      defaultValue={initial}
      theme="vs-dark"
      language="javascript"
      options={{
        tabIndex: 2,
        fontSize: 16,
        smoothScrolling: true,
        wordWrap: "on",
        minimap: { enabled: false },
      }}
    />
  );
};

export default Editor;
