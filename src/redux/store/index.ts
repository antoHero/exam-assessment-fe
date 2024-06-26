import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

export const store = configureStore({
    reducer: {
        userReducer
    },
    devTools: true,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
