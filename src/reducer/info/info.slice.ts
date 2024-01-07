import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InfoState {
  session: number | null;
  currentRoomId: number | null;
  showAuthModal: boolean;
}

const initialState: InfoState = {
  session: sessionStorage?.id || null,
  currentRoomId: null,
  showAuthModal: false,
};

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateInfoField: (
      state: InfoState,
      action: PayloadAction<{
        name: keyof InfoState;
        value: InfoState[keyof InfoState];
      }>
    ) => {
      state = Object.assign(state, {
        [action.payload.name]: action.payload.value,
      });
    },
  },
});

export const infoActions = infoSlice.actions;
export const infoReducer = infoSlice.reducer;
