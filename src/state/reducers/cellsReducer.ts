import { Action } from "../action";
import { ActionTypes } from "../action-types";
import { Cell } from "../cell";

interface StatesCell {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const intialState: StatesCell = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = (
  state: StatesCell = intialState,
  action: Action
): StatesCell => {
  switch (action.type) {
    case ActionTypes.MOVE_CELL:
      return state;
    case ActionTypes.DELETE_CELL:
      return state;
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: { ...state.data[id], content },
        },
      };
    case ActionTypes.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};

export default cellReducer;
