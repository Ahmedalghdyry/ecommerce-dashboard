import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IGlobalState {
    isOpenCartDrawer: boolean;
    onOpenCartDrawer: boolean;
    onCloseCartDrawer: boolean;
}

const initialState: IGlobalState = {
    isOpenCartDrawer: false,
    onOpenCartDrawer: false,
    onCloseCartDrawer: false,
}

const globalSlice = createSlice({
name: "global",
initialState,
reducers: {
onOpenCartDraweraction: (state) => {
    state.onOpenCartDrawer = true;
    state.isOpenCartDrawer = true;
},
onCloseCartDraweraction: (state) => {
    state.onCloseCartDrawer = false;
    state.isOpenCartDrawer = false;
},
},
})

export const {onOpenCartDraweraction, onCloseCartDraweraction} = globalSlice.actions;

export const selectGlobal = (global: RootState) => global.global;

export default globalSlice.reducer;