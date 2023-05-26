import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/Root/rootSlice";

export const store = configureStore({
    reducer: {
        someState: rootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
