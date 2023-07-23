import {createAsyncThunk} from "@reduxjs/toolkit";
import {calculateServices} from "../../Calculates/services/services";
import {AxiosError} from "axios";
import {finalScoreServices} from "../services/services";
import {fetchCollectionByID, fetchCollections} from "../../Collections/store/thunk";
import {RootState} from "../../../app/store";
import {fetchAlternatives} from "../../Alternatives/store/thunk";

export const getFinalScores = createAsyncThunk('final_score/getFinalScore', async (id: string, {rejectWithValue}) => {
    try {
        const res = await finalScoreServices.getFinalScores(id)
        return res.data.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    }
})

export const calculateFinalScores = createAsyncThunk('final_score/calculate', async (id: string, {rejectWithValue, dispatch, getState}) => {
    const state = getState() as RootState
    try {
        const res = await finalScoreServices.calculateFinalScores(id)
        return res.data
    } catch (e) {
        return rejectWithValue({data: e as AxiosError})
    } finally {
        await dispatch(fetchCollectionByID(state.collectionState.selectedCollection!.id!))
        await dispatch(fetchAlternatives(state.collectionState.selectedCollection!.id!))
        await dispatch(getFinalScores(state.collectionState.selectedCollection!.id!))
    }
})