import {AxiosError} from "axios";
import {criteria} from "../../../domain/Criteria/model";
import {requestCriteria} from "../../../domain/Criteria/dto";
import {checkConsistency, fetchCriteria, updateCriteria} from "./thunk";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CriteriaState {
    criteria: criteria;
    loading: boolean;
    consistencyRatio: boolean | null;
    error: any | AxiosError | null;
}

const initialState: CriteriaState = {
    criteria: {pairwise: [], weights: [],},
    loading: false,
    error: null,
    consistencyRatio: null,
}

const slice = createSlice({
    name: "criteria_slice",
    initialState,
    reducers: {
        changeValueCriteria(state, action: PayloadAction<requestCriteria>) {
            state.criteria.pairwise![action.payload.indexRow][action.payload.indexCol] = action.payload.value
            state.criteria.pairwise![action.payload.indexCol][action.payload.indexRow] = parseFloat((1 / action.payload.value).toFixed(3))
        }
    },
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

        builder.addCase(updateCriteria.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCriteria.fulfilled, (state, action) => {
            state.loading = false
            state.criteria = action.payload.data
        });
        builder.addCase(updateCriteria.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload

        })

        builder.addCase(checkConsistency.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(checkConsistency.fulfilled, (state, action) => {
            state.loading = false
            state.consistencyRatio = action.payload.data
        });
        builder.addCase(checkConsistency.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})


export const {changeValueCriteria} = slice.actions
export default slice.reducer