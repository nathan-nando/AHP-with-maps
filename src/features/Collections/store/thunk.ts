import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {collectionServices} from "../services/services";
import {requestCreateCollection} from "../../../domain/Collections/dto";
import {collection} from "../../../domain/Collections/model";

export const fetchCollections = createAsyncThunk('collection/fetchCollections', async (_, {rejectWithValue}) => {
    try {
        const res = await collectionServices.getCollections()
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    }
})

export const fetchCollectionByID = createAsyncThunk('collection/fetchByCollectionID', async (id: string, {
    rejectWithValue,
}) => {

    try {
        const res = await collectionServices.getCollectionByID(id)
        return res.data.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    }
})

export const createCollection = createAsyncThunk('collection/create', async (payload: requestCreateCollection, {
    rejectWithValue,
    dispatch
}) => {
    try {
        const res = await collectionServices.createCollections(payload)
        return res.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchCollections())
    }
})

export const updateCollection = createAsyncThunk('collection/update', async (payload: collection, {
    rejectWithValue,
    dispatch
}) => {
    try {
        const res = await collectionServices.updateCollections(payload)
        return res.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchCollections())
    }
})

export const deleteCollection = createAsyncThunk('collection/delete', async (id: string, {
    rejectWithValue,
    dispatch
}) => {
    try {
        const res = await collectionServices.deleteCollection(id)
        return res.data
    } catch (e) {
        rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchCollections())
    }
})