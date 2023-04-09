import cellReducer from "./cellsReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  cells: cellReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;