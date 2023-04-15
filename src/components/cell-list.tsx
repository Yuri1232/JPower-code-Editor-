import { useTypedSelector } from "../hooks/type-selector";
import AddCell from "./add-cell";
import { Fragment, useEffect } from "react";
import CellListItem from "./cell-list-item";
import "../style/code-text.css";
import { BindActions } from "../hooks/bindAction";

const CellList: React.FC = () => {
  const { fetchCells } = BindActions();
  useEffect(() => {
    fetchCells();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cell = useTypedSelector((state) => {
    return state.cells?.order.map((id) => {
      return state.cells?.data[id];
    });
  });

  const renderItem = cell?.map((cells) => (
    <Fragment key={cells?.id}>
      <CellListItem cell={cells} />
      <AddCell id={cells?.id} />
      <div className="bottom-border"></div>
    </Fragment>
  ));
  return (
    <div>
      <AddCell opacity={cell?.length === 0} id={null} />
      <div className="bottom-border"></div>
      {renderItem}
    </div>
  );
};

export default CellList;
