import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IParent } from "../../models/models";

export interface RoomState {
  id: number | null;
  messages: IMessage[];
  parent: IParent | null;
}

const initialState: RoomState = {
  id: null,
  messages: [],
  parent: null,
};

export const roomSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateRoomId: (state: RoomState, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    addMessage: (state: RoomState, action: PayloadAction<IMessage>) => {
      state.messages = state.messages.concat(action.payload);
    },
    updateMessage: (state: RoomState, action: PayloadAction<IMessage>) => {
      state.messages = state.messages?.map((elem) =>
        elem.id === action.payload.id ? action.payload : elem
      );
    },
    loadMessages: (state: RoomState, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    updateParent: (state: RoomState, action: PayloadAction<IParent>) => {
      state.parent = action.payload;
    },
    clearParent: (state: RoomState) => {
      state.parent = initialState.parent;
    },
    clearRoom: (state: RoomState) => {
      state = Object.assign(state, initialState);
    },
  },
});

export const roomActions = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
