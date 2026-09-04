import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: { isOnline: boolean } = {
  isOnline: true,
};

const netowrkSlice = createSlice({
  name: "netowrk",
  initialState,
  reducers: {
    netowrkMode: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { netowrkMode } = netowrkSlice.actions;

export const selectNetowrk = (state: RootState) => state.netowrk;

export default netowrkSlice.reducer;
