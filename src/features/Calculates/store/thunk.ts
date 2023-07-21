import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {calculateServices} from "../services/services";
import {RootState} from "../../../app/store";
import {fetchCollectionByID, fetchCollections} from "../../Collections/store/thunk";

export const fetchPoint = createAsyncThunk('calculate/fetchPoint', async (id: string, {rejectWithValue}) => {
    try {
        const res = await calculateServices.fetchPoint(id)
        return res.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    }
})

export const getScores = createAsyncThunk('calculate/getScores', async (id: string, {rejectWithValue}) => {
    try {
        const res = await calculateServices.getScores(id)
        return res.data.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    }
})


export const calculateScores = createAsyncThunk('calculate/calculateScores', async (id: string, {rejectWithValue, getState, dispatch}) => {
    const state = getState() as RootState

    try {
        const res = await calculateServices.calculateScores(id)
        return res.data.data
    } catch (e) {
        return  rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchCollections)
        await dispatch(fetchCollectionByID(state.collectionState.selectedCollection!.id!))
    }
})
