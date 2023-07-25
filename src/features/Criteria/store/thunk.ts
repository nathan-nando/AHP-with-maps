import {createAsyncThunk} from "@reduxjs/toolkit";
import {criteriaServices} from "../services/services";
import {AxiosError} from "axios";
import {RootState} from "../../../app/store";

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

export const updateCriteria = createAsyncThunk('criteria/updateCriteria', async (_, {
    getState,
    rejectWithValue,
    dispatch
}) => {
    const state = getState() as RootState;
    try {
        const res = await criteriaServices.updateCriteria({pairwise: state.criteriaState.criteria.pairwise})
        return res.data;
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    } finally {
        // await dispatch(fetchCriteria())
        await dispatch(checkConsistency())
    }
})

export const checkConsistency = createAsyncThunk('criteria/checkConsistency', async (_, {rejectWithValue}) => {
    try {
        const res = await criteriaServices.checkConsistency()
        return res.data;
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    }
})