import { BindActions } from "../hooks/bindAction";
import "../style/cellbar.css";

interface CellBarProps {
  id: any;
}
const CellBar: React.FC<CellBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = BindActions();
  return (
    <div className="buttons">
      <img
        src="./image/up.png"
        className="button"
        alt="arrow"
        onClick={() => moveCell(id, "up")}
      />
      <img
        src="./image/down.png"
        className="button"
        alt="arrow"
        onClick={() => moveCell(id, "down")}
      />
      <img
        src="./image/cross.png"
        className="button"
        alt="arrow"
        onClick={() => deleteCell(id)}
      />
    </div>
  );
};

export default CellBar;
