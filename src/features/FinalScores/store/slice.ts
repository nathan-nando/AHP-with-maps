import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {calculateFinalScores, getFinalScores} from "./thunk";
import {finalScore} from "../../../domain/FinalScores/model";
import {alternative} from "../../../domain/Alternatives/model";

export interface CriteriaState {
    finalScore: alternative[]
    loading: boolean;
    error: any | AxiosError | null;
}

const initialState: CriteriaState = {
    finalScore: [],
    loading: false,
    error: null,
}
export const slice = createSlice({
    name: "final_slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFinalScores.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFinalScores.fulfilled, (state, action) => {
            state.loading = false
            state.finalScore = action.payload
        });
        builder.addCase(getFinalScores.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(calculateFinalScores.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(calculateFinalScores.fulfilled, (state, action) => {
            state.loading = false
        });
        builder.addCase(calculateFinalScores.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default slice.reducer