import {createSlice} from "@reduxjs/toolkit";
import {subCriteria, subCriteriaCR} from "../../../domain/SubCriteria/model";
import {AxiosError} from "axios";
import {checkConsistencySC, fetchSubCriteria, updateSubCriteria} from "./thunk";

export interface SubCriteriaState{
    subCriteria: subCriteria;
    loading:boolean;
    consistencyRatio:subCriteriaCR,
    error:any|AxiosError|null,
    selected: number
}

const initialState: SubCriteriaState = {
    selected: 0,
    subCriteria: {},
    loading: false,
    error: null,
    consistencyRatio: {},
}

const slice = createSlice({
    name: "subCriteria_slice",
    initialState,
    reducers: {
        changeCompSC(state, action){
            state.selected = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchSubCriteria.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(fetchSubCriteria.fulfilled, (state, action)=>{
            state.loading = false;
            state.subCriteria = action.payload.data
        })
        builder.addCase(fetchSubCriteria.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(updateSubCriteria.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(updateSubCriteria.fulfilled, (state, action)=>{
            state.loading = false;
            state.subCriteria = action.payload.data
        })
        builder.addCase(updateSubCriteria.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })

        builder.addCase(checkConsistencySC.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(checkConsistencySC.fulfilled, (state, action)=>{
            state.loading = false;
            state.consistencyRatio = action.payload.data
        })
        builder.addCase(checkConsistencySC.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })

    }
})

export const {changeCompSC} = slice.actions

export default slice.reducer