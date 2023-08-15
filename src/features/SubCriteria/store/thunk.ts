import {createAsyncThunk} from "@reduxjs/toolkit";
import {subCriteriaServices} from "../services/services";
import {AxiosError} from "axios";
import {RootState} from "../../../app/store";
import {checkConsistency} from "../../Criteria/store/thunk";

export const fetchSubCriteria = createAsyncThunk('subCriteria/fetch', async (_, {rejectWithValue, dispatch}) => {
    try {
        const res = await subCriteriaServices.getSubCriteria();
        return res.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    } finally {

    }
})

export const updateSubCriteria = createAsyncThunk('subCriteria/update', async (_, {
    getState,
    rejectWithValue,
    dispatch
}) => {
    const state = getState() as RootState
    try {
        const res = await subCriteriaServices.updateSubCriteria(state.subCriteriaState.subCriteria)
        return res.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
    }
})

export const checkConsistencySC = createAsyncThunk('subCriteria/checkCR', async (mode: string, {rejectWithValue}) => {
    try {
        const res = await subCriteriaServices.checkConsistencySubCriteria(mode)
        console.log("CR SUB" + res.data.data)
        return res.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    }
})