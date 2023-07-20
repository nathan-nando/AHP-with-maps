import {createSlice} from "@reduxjs/toolkit";


export interface GlobalState {
    loading: boolean;
    error: string | null;
    showModal: boolean;
    modeModal: "create" | "update"
}

const initialState: GlobalState = {
    loading: false,
    error: null,
    showModal: false,
    modeModal: "create"
};

const globalSlice = createSlice({
    name: "global_slice",
    initialState,
    reducers: {
        showModal(state) {
            state.showModal = true;
        },
        hideModal(state) {
            state.showModal = false;
        },
        modeModalToCreate(state) {
            state.modeModal = "create"
        },
        modeModalToUpdate(state) {
            state.modeModal = "update"
        }
    },

});

export const {showModal, hideModal, modeModalToCreate, modeModalToUpdate} = globalSlice.actions

export default globalSlice.reducer;
