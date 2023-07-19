import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {criteriaServices} from "./services";
import {RootState} from "../../app/store";

export type criteria = {
    pairwise?: number[][];
    weights?: number[]
}

export type payloadCriteria = {
    value: number;
    indexRow: number;
    indexCol: number;
}

export interface CriteriaState {
    criteria: criteria
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
        changeValueCriteria(state, action: PayloadAction<payloadCriteria>) {
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

export const fetchCriteria = createAsyncThunk('criteria/fetchCriteria', async (_, {rejectWithValue, dispatch}) => {
    try {
        const res = await criteriaServices.getCriteria();
        return res.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(checkConsistency())
    }
})

export const updateCriteria = createAsyncThunk('criteria/updateCriteria', async (_, {getState, rejectWithValue, dispatch}) => {
    const state = getState() as RootState;
    try {
        const res = await criteriaServices.updateCriteria({pairwise: state.criteriaState.criteria.pairwise})
        return res.data;
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    } finally {
        await  dispatch(checkConsistency())
    }
})

export const checkConsistency = createAsyncThunk('criteria/checkConsistency', async (_, {rejectWithValue})=>{
    try {
        const res = await criteriaServices.checkConsistency()
        return res.data;
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    }
})

export const {changeValueCriteria} = slice.actions
export default slice.reducer