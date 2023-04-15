import { ActionType } from "../action-types";
import { Cell, CellTypes } from "../cell";

export type Direction = "up" | "down";
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCell {
  type: ActionType.FETCH_CELL;
}

export interface FetchCellComplete {
  type: ActionType.FETCH_CELL_COMPLETE;
  payload: Cell[];
}

export interface FetchCellError {
  type: ActionType.FETCH_CELL_ERROR;
  payload: string;
}

export interface SaveCell {
  type: ActionType.SAVE_CELL_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCell
  | FetchCellComplete
  | FetchCellError
  | SaveCell;
