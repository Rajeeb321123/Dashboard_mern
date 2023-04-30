// REDUX TOOL KIT
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:"dark",
    // below userId is one of the fake userid from fake data we provided in backend
    userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({

    // property
    name:"global",
    initialState,

    // reducer are just function for changing global state
    reducers:{

        setMode:(state)=> {
            state.mode = state.mode === "light" ? "dark" :"light";
        },



    }
})

// below provide access of state and reducer in other file
export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
// while we import state in index.js in src, we have to import globalReducer as name of this slice is globalSlice