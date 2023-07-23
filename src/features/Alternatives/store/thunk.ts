import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {alternativeServices} from "../services/services";
import {requestCreateAlternative} from "../../../domain/Alternatives/dto";
import {alternative} from "../../../domain/Alternatives/model";
import {RootState} from "../../../app/store";

export const fetchAlternatives = createAsyncThunk('alternatives/fetchAll', async (id: string, {rejectWithValue}) => {
    try {
        const res = await alternativeServices.getAlternativesByID(id)
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    }
})

export const fetchAlternativeByID = createAsyncThunk('alternatives/fetchByID', async (id: string, {rejectWithValue}) => {
    try {
        const res = await alternativeServices.getAlternativeByID(id)
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    }
})


export const createAlternative = createAsyncThunk('alternatives/create', async (payload: requestCreateAlternative, {rejectWithValue, dispatch}) => {
    try {
        const res = await alternativeServices.createAlternative(payload)
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchAlternatives(payload.id!))
    }
})

export const updateAlternative = createAsyncThunk('alternatives/update', async (payload: alternative, {rejectWithValue, dispatch, getState}) => {
    const state = getState() as RootState
    try {
        const res = await alternativeServices.updateAlternative(payload)
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchAlternatives(state.collectionState.selectedCollection!.id!))
    }
})

export const deleteAlternative = createAsyncThunk('alternatives/delete', async (id: string, {
    rejectWithValue,
    dispatch,
    getState
}) => {
    const state = getState() as RootState

    try {
        const res = await alternativeServices.deleteAlternative(id)
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchAlternatives(state.collectionState.selectedCollection!.id!))

    }
})
