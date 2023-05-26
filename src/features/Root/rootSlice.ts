import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/User";

export type someType = {
    a?: number | string;
    b?: number;
}

const initialSomeType: someType[] = [
    {a: 0, b: 0},
    {a: 1, b: 1},
]

export interface DanaPensiunState {
    someData: someType[];
    loading: boolean;
    error: string | null;
    user: User | null,
}

const initialState: DanaPensiunState = {
    user: null,
    someData: initialSomeType,
    loading: false,
    error: null,
};

const somePromises = (times:number) =>{
    return new Promise(resolve => setTimeout( resolve, times))
}

export const fakeFetch = createAsyncThunk('root/fakeLoading', async () => {
    let user: User;
    await somePromises(2000)
    user = {username: "nathan"}
    return user;
})

const someSlice = createSlice({
    name: "some_slice",
    initialState,
    reducers: {
        addSomeData: (state, action: PayloadAction<someType>) => {
            state.someData.push(action.payload)
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fakeFetch.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });

        builder.addCase(fakeFetch.pending, (state, action) => {
            state.loading = true;
        })
    }
});

export const {addSomeData} = someSlice.actions;

export default someSlice.reducer;
