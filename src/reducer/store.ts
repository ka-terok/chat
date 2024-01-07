import { configureStore } from "@reduxjs/toolkit";
import { infoReducer } from "./info/info.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./user/user.slice";
import { roomReducer } from "./room/room.slice";

export const store = configureStore({
  reducer: {
    info: infoReducer,
    user: userReducer,
    room: roomReducer,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
