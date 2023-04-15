import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { MiddlewareR } from "./actions/middlewares/middlewareR";
export const store = createStore(
  reducers,
  {},
  applyMiddleware(MiddlewareR, thunk)
);
