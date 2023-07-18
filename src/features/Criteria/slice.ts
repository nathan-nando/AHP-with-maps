import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {criteriaServices} from "./services";

export type criteria = {
    pairwise: number[][];
    weights: number[]
}

export interface CriteriaState {
    criteria: criteria
    loading: boolean;
    error: any | AxiosError | null;
}

const initialState: CriteriaState = {
    criteria: {pairwise: [], weights: [],},
    loading: false,
    error: null
}

const slice = createSlice({
    name: "criteria_slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCriteria.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCriteria.fulfilled, (state, action) => {
            state.loading = false
            state.criteria = action.payload.data
        });
        builder.addCase(fetchCriteria.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export const fetchCriteria = createAsyncThunk('criteria/fetchCriteria', async (_, thunkAPI) => {
    try {
        const res = await criteriaServices.getCriteria();
        return res.data
    } catch (e) {
        return thunkAPI.rejectWithValue({data: e as AxiosError})
    }
})
export default slice.reducer