import { Dispatch } from "redux";
import { Action } from "..";
import { ActionType } from "../../action-types";
import { RootState } from "../../reducers";
import { saveCells } from "../../action-creators";

export const MiddlewareR = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timmer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timmer) {
          clearTimeout(timmer);
        }
        timmer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 300);
      }
    };
  };
};
