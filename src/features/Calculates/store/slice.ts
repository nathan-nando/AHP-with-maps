import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {checkConsistency} from "../../Criteria/store/thunk";
import {calculateScores, fetchPoint} from "./thunk";
import {score} from "../../../domain/Scores/model";
import {alternative} from "../../../domain/Alternatives/model";

export interface CalculateState {
    alternative: alternative[]
    multiplyPoint: number[][];
    loading: boolean;
    error: any | AxiosError | null;
}

const initialState: CalculateState = {
    alternative: [],
    multiplyPoint: [],
    loading: false,
    error: null,
}
export const slice = createSlice({
    name: "calculates_slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPoint.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchPoint.fulfilled, (state, action) => {
            state.loading = false
            state.multiplyPoint = action.payload.data
        });
        builder.addCase(fetchPoint.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(calculateScores.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(calculateScores.fulfilled, (state, action) => {
            state.loading = false
        });
        builder.addCase(calculateScores.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default slice.reducer