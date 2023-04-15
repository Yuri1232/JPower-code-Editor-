import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import { bindActionCreators } from "redux";

export const BindActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
