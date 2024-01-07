import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  login: string;
  password: string;
  alias: string;
  id: number | null;
}

const login = sessionStorage.user && JSON.parse(sessionStorage.user)?.login;
const id = sessionStorage.user && JSON.parse(sessionStorage.user)?.id;
const alias = sessionStorage.user && JSON.parse(sessionStorage.user)?.alias;

const initialState: UserState = {
  login: login ?? "",
  password: "",
  alias: alias ?? "",
  id: id ?? null,
};

export const userSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateUserFields: (
      state: UserState,
      action: PayloadAction<Record<keyof UserState, UserState[keyof UserState]>>
    ) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
