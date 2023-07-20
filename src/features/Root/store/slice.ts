import { createSlice} from "@reduxjs/toolkit";


export interface GlobalState {
    loading: boolean;
    error: string | null;
}

const initialState: GlobalState = {
    loading: false,
    error: null,
};

const globalSlice = createSlice({
    name: "global_slice",
    initialState,
    reducers: {


    },

});

export default globalSlice.reducer;
