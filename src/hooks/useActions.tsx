import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { infoActions } from "../reducer/info/info.slice";
import { userActions } from "../reducer/user/user.slice";
import { roomActions } from "../reducer/room/room.slice";

const actions = {
  ...infoActions,
  ...userActions,
  ...roomActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
