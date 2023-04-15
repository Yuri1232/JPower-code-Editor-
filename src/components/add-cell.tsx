import { BindActions } from "../hooks/bindAction";
interface AddCellProps {
  id: any;
  opacity?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ id, opacity }) => {
  const { insertCellAfter } = BindActions();
  return (
    <div className={`code-text ${opacity && "visable"}`}>
      <button onClick={() => insertCellAfter(id, "code")}>Code</button>
      <button onClick={() => insertCellAfter(id, "text")}>Markdown</button>
    </div>
  );
};

export default AddCell;
