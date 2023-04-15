import { Cell } from "../state";
import CellBar from "./cell-bar";
import CodeInstance from "./codeInstance";
import Markdown from "./markdown";
import "../style/index.css";

interface CellItemProps {
  cell: Cell | undefined;
}

const CellListItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell?.type === "code") {
    child = <CodeInstance code={cell} />;
  } else {
    child = <Markdown edit={cell} />;
  }
  return (
    <div className="list-item">
      <CellBar id={cell?.id} />
      {child}
    </div>
  );
};

export default CellListItem;
